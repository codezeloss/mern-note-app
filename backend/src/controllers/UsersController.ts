import { RequestHandler } from "express";
import createHttpError from "http-errors";
import User from "../models/User";
import bcrypt from "bcrypt";

// TS Interfaces
interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

interface LoginBody {
  username?: string;
  password?: string;
}

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not authenticated");
    }

    const user = await User.findById(authenticatedUserId).select("+email").exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// SIGN UP
export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const { username, email } = req.body;
  const passwordRaw = req.body.password;

  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "Parameters missing");
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      throw createHttpError(
        409,
        "Username already taken. Please choose a different one or Log In instead!"
      );
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      throw createHttpError(
        409,
        "Email already taken. Please choose a different one or Log In instead!"
      );
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await User.create({
      username: username,
      email: email,
      password: passwordHashed,
    });

    // session
    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// LOGIN
export const logIn: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // check if there are entered values
    if (!username || !password) {
      throw createHttpError(400, "Parameters missing");
    }

    // check if the user !exist
    const user = await User.findOne({ username })
      .select("+password +email")
      .exec();
    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }

    // check if the password !matched
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      throw createHttpError(401, "Invalid credentials");
    }

    // session
    req.session.userId = user._id;

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// LOG OUT
export const logOut: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
    }
  });
};

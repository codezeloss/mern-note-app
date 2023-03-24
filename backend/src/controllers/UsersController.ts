import { RequestHandler } from "express";
import createHttpError from "http-errors";
import User from "../models/User";
import bcrypt from "bcrypt";

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

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

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

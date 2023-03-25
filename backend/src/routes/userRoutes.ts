import express from "express";
import * as UsersController from "../controllers/UsersController";

const router = express.Router();

router.get("/", UsersController.getAuthenticatedUser);
router.post("/signup", UsersController.signUp);
router.post("/login", UsersController.logIn);
router.post("/logout", UsersController.logOut);

export default router;

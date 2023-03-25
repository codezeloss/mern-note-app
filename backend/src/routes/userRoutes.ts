import express from "express";
import * as UsersController from "../controllers/UsersController";
import { requiresAuth } from "../middlewares/auth";

const router = express.Router();

router.get("/", requiresAuth, UsersController.getAuthenticatedUser);
router.post("/signup", UsersController.signUp);
router.post("/login", UsersController.logIn);
router.post("/logout", UsersController.logOut);

export default router;

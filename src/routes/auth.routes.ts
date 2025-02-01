import express from "express";
import AuthController from "../controllers/auth.controller";
import {
  validateLogin,
  validateRegister,
} from "../utils/validations/auth.validations";

const router = express.Router();

router.post("/register", validateRegister, AuthController.register);

router.post("/login", validateLogin, AuthController.login);

export default router;

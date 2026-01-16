import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// Routes for public login and signup
router.post("/signup", signup);
router.post("/login", login);
export default router;

import express from "express";
import { signupUser } from "../controllers/authControllers.js";

const router = express.Router();

// Route for user signup
router.post("/signup", signupUser);

export default router;
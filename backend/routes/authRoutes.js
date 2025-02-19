import express from "express";
import { registerUser, loginUser, updateProfile } from "../controllers/authController.js";
import upload from "../middleware/uploadmiddleware.js";
import { check } from "express-validator";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Signup Route (Handles image upload)
router.post(
  "/signup",
  upload.single("profileImage"),
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  registerUser
);

// Login Route
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);

// Update Profile (Protected Route)
router.put(
  "/update",
  protect,
  upload.single("profileImage"),
  updateProfile
);
export default router;

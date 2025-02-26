import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Get user profile
router.get("/profile", protect, getUserProfile);

// Update user profile (Supports image upload)
router.put("/profile", protect, upload.single("profileImage"), updateUserProfile);

export default router;

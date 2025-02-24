import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import dotenv from "dotenv";

dotenv.config();

// Signup Controller
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, phone, role, location } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password,  //no need to hash password here
      phone,
      role,
      location,
      profileImage,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login Controller
export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid pass" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//Update profile controller 
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, phone, location, password } = req.body;
    let updatedFields = {};

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields if provided
    // Update fields if provided
    if (name && name !== user.name) updatedFields.name = name;
    if (email && email !== user.email) updatedFields.email = email;
    if (phone && phone !== user.phone) updatedFields.phone = phone;
    if (location && location !== user.location) updatedFields.location = location;

    // If user uploads a new profile picture
    if (req.file) {
      updatedFields.profileImage = `/uploads/${req.file.filename}`;
    }

    // If user wants to update password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }
   
     // Ensure the object is not empty before updating
     if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ message: "No changes detected" });
    }
    // Force update the `updatedAt` timestamp
    updatedFields.updatedAt = new Date();

    // Update user in database
    console.log("Received update request with data:", req.body);
    await user.update(updatedFields);
    
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Fetch User Profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "phone", "role", "location", "profileImage"],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



import User from "../models/User.js";
import bcrypt from "bcryptjs";

// GET USER PROFILE
export const getUserProfile = async (req, res) => {
  const userId=req.user.id;
  console.log(userId);
  try {
    const user = await User.findOne({ where: {id:req.user.id}});
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });
    

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




// UPDATE USER PROFILE
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findone({id:req.user.id});
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields
    if (req.body.name) user.name = req.body.name;
    if (req.body.phone) user.phone = req.body.phone;
    if (req.body.location) user.location = req.body.location;
    
    // Handle image upload
    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`;
    }

    // If updating password
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

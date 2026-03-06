import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register user
router.post("/", registerUser);

// Login user
router.post("/login", loginUser);

// Get all users (admin only, optional)
router.get("/", getUsers);

// Get user by ID
router.get("/:id", getUserById);

// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

// Protected route: Get logged-in user profile
router.get("/profile/me", protect, getUserProfile);

export default router;

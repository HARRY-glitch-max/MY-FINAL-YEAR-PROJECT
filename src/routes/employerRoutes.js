import express from "express";
import {
  createEmployer,
  loginEmployer,
  getEmployers,
  getEmployerById,
  updateEmployer,
  deleteEmployer,
  shortlistCandidate
} from "../controllers/employerController.js";
import { protect } from "../middleware/authMiddleware.js"; // ✅ use named import

const router = express.Router();

// Public routes
router.post("/register", createEmployer);   // Register employer
router.post("/login", loginEmployer);       // Login employer

// Protected routes
router.get("/", protect, getEmployers);          // Get all employers (admin only ideally)
router.get("/:id", protect, getEmployerById);    // Get employer by ID
router.put("/:id", protect, updateEmployer);     // Update employer profile
router.delete("/:id", protect, deleteEmployer);  // Delete employer

// Employer-specific action
router.put("/applications/:id/shortlist", protect, shortlistCandidate);

export default router;

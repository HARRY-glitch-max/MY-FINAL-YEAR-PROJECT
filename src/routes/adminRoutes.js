import express from "express";
import { registerAdmin, loginAdmin, getAdminReports } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register a new admin
router.post("/register", registerAdmin);

// Login admin
router.post("/login", loginAdmin);

// Generate reports (protected route)
router.get("/reports", protect, getAdminReports);

export default router;

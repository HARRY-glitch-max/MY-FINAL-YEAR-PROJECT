import express from "express";
import { protect } from "../middleware/authMiddleware.js";   // <-- curly braces
import { uploadCV, getCVs } from "../controllers/cvController.js";

const router = express.Router();

// Protected route: only logged-in users can upload CVs
router.post("/", protect, uploadCV);

// Public route: anyone can view CVs
router.get("/", getCVs);

export default router;

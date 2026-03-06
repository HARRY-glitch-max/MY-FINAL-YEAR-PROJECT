import express from "express";
import { applyJob, getApplications } from "../controllers/applicationController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, applyJob);
router.get("/", protect, getApplications);

export default router;
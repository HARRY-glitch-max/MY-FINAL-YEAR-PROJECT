import express from "express";
import {
  createApplication,
  getApplications,
  getApplicationsByJob,
  getApplicationsByUser,
  getApplicationById,        // ✅ new
  updateApplicationStatus,
  deleteApplication,
  shortlistCandidate
} from "../controllers/applicationController.js";

const router = express.Router();

// Submit application
router.post("/", createApplication);

// Get all applications
router.get("/", getApplications);

// Get applications by job
router.get("/job/:jobId", getApplicationsByJob);

// Get applications by user
router.get("/user/:userId", getApplicationsByUser);

// Get application by ID
router.get("/:id", getApplicationById);   // ✅ new

// Update application status
router.put("/:id/status", updateApplicationStatus);

// Shortlist candidate
router.put("/:id/shortlist", shortlistCandidate);

// Delete application
router.delete("/:id", deleteApplication);

export default router;

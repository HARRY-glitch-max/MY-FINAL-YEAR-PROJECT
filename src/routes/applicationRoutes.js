import express from "express";
import {
  createApplication,
  getApplications,
  getApplicationsByJob,
  getApplicationsByUser,
  updateApplicationStatus,
  deleteApplication
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

// Update application status
router.put("/:id/status", updateApplicationStatus);

// Delete application
router.delete("/:id", deleteApplication);

export default router;

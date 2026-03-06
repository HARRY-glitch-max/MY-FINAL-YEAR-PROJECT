import express from "express";
import {
  createEmployer,
  getEmployers,
  getEmployerById,
  updateEmployer,
  deleteEmployer
} from "../controllers/employerController.js";

const router = express.Router();

// Create employer
router.post("/", createEmployer);

// Get all employers
router.get("/", getEmployers);

// Get employer by ID
router.get("/:id", getEmployerById);

// Update employer
router.put("/:id", updateEmployer);

// Delete employer
router.delete("/:id", deleteEmployer);

export default router;

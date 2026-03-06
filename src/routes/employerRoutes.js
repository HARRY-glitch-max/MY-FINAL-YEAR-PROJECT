import express from "express";   // ✅ this line is required
import {
  createEmployer,
  loginEmployer,
  getEmployers,
  getEmployerById,
  updateEmployer,
  deleteEmployer,
  shortlistCandidate
} from "../controllers/employerController.js";

const router = express.Router();

// Register employer
router.post("/register", createEmployer);

// Login employer
router.post("/login", loginEmployer);

// Other routes
router.get("/", getEmployers);
router.get("/:id", getEmployerById);
router.put("/:id", updateEmployer);
router.delete("/:id", deleteEmployer);
router.put("/applications/:id/shortlist", shortlistCandidate);

export default router;

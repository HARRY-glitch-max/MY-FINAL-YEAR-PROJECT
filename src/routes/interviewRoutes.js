import express from "express";
import { bookInterview, getInterviewsByJob, getInterviewsByUser } from "../controllers/interviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/book", protect, bookInterview);
router.get("/job/:jobId", protect, getInterviewsByJob);
router.get("/user/:userId", protect, getInterviewsByUser);

export default router;

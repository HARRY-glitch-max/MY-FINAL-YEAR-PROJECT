import express from "express";
import multer from "multer";
import { uploadCV } from "../controllers/cvController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", protect, upload.single("cv"), uploadCV);

export default router;
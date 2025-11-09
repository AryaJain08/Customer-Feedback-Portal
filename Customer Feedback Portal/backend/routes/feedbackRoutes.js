import express from "express";
import { createFeedback, getMyFeedbacks, getAllFeedbacks } from "../controllers/feedbackController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST: Create new feedback
router.post("/", protect, createFeedback);

// GET: Logged-in user's feedbacks
router.get("/my", protect, getMyFeedbacks);

// GET: Admin - all feedbacks
router.get("/", protect, adminOnly, getAllFeedbacks);

export default router;

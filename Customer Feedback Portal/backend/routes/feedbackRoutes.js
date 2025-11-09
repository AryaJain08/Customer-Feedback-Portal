import express from "express";
import {
  createFeedback,
  getMyFeedbacks,
  getAllFeedbacks,
} from "../controllers/feedbackController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/feedback
 * @desc    Create new feedback (Logged-in user only)
 * @access  Private
 */
router.post("/", protect, async (req, res, next) => {
  try {
    console.log("🟢 Incoming feedback request body:", req.body);
    console.log("🟢 Authenticated user:", req.user);

    // Basic input validation
    if (!req.body.text || !req.body.rating) {
      return res.status(400).json({ message: "Feedback text and rating are required." });
    }

    // Call the controller function
    await createFeedback(req, res);
  } catch (error) {
    console.error("❌ Error in POST /api/feedback:", error);
    res.status(500).json({
      message: "Internal Server Error while creating feedback.",
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/feedback/my
 * @desc    Get feedbacks by the logged-in user
 * @access  Private
 */
router.get("/my", protect, async (req, res) => {
  try {
    await getMyFeedbacks(req, res);
  } catch (error) {
    console.error("❌ Error in GET /api/feedback/my:", error);
    res.status(500).json({
      message: "Internal Server Error while fetching user feedbacks.",
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/feedback
 * @desc    Admin only - Get all feedbacks
 * @access  Private/Admin
 */
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    await getAllFeedbacks(req, res);
  } catch (error) {
    console.error("❌ Error in GET /api/feedback (Admin):", error);
    res.status(500).json({
      message: "Internal Server Error while fetching all feedbacks.",
      error: error.message,
    });
  }
});

export default router;

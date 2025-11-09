import Feedback from "../models/feedbackModel.js";

// =============================
// Create New Feedback
// =============================
export const createFeedback = async (req, res) => {
  try {
    const { text, rating } = req.body;

    // Validate input
    if (!text || !rating) {
      return res.status(400).json({ message: "Please provide both feedback text and rating." });
    }

    // Create feedback entry
    const feedback = await Feedback.create({
      user: req.user._id,
      text,     // matches your frontend and model
      rating,
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    console.error("❌ Feedback creation error:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// =============================
// Get Feedbacks by Logged-in User
// =============================
export const getMyFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ user: req.user._id })
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      feedbacks,
    });
  } catch (error) {
    console.error("❌ Error fetching user feedbacks:", error.message);
    res.status(500).json({ message: "Failed to load feedbacks", error: error.message });
  }
};

// =============================
// Get All Feedbacks (Admin)
// =============================
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "name email");

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      feedbacks,
    });
  } catch (error) {
    console.error("❌ Error fetching all feedbacks:", error.message);
    res.status(500).json({ message: "Failed to load feedbacks", error: error.message });
  }
};

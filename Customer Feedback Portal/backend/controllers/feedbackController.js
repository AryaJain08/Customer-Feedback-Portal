import Feedback from "../models/feedbackModel.js";

// Create feedback
export const createFeedback = async (req, res) => {
  try {
    const { message, rating } = req.body;
    const feedback = await Feedback.create({
      user: req.user._id,
      message,
      rating,
    });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get feedbacks for current user
export const getMyFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ user: req.user._id }).populate("user", "name");
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all feedbacks (admin)
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user", "name");
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

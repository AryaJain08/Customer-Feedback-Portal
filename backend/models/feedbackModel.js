import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: [true, "Feedback text is required."],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required."],
      min: [1, "Minimum rating is 1"],
      max: [5, "Maximum rating is 5"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;

import React, { useState, useEffect } from "react";
import API from "../services/api";

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const res = await getFeedbacks(token);
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const deleteFeedback = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await API.delete(`/feedback/${id}`);
      setFeedbacks(feedbacks.filter((f) => f._id !== id));
      alert("Feedback deleted!");
    } catch (error) {
      alert("Error deleting feedback");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Manage all customer feedback submissions below:</p>
      {feedbacks.length === 0 ? (
        <p>No feedbacks yet.</p>
      ) : (
        feedbacks.map((fb) => (
          <div className="feedback-card" key={fb._id}>
            <h4>{fb.user?.name || "Anonymous"}</h4>
            <p>{fb.message}</p>
            <small>Rating: {fb.rating} ⭐</small>
            <br />
            <button
              style={{ background: "crimson", marginTop: 5 }}
              onClick={() => deleteFeedback(fb._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;

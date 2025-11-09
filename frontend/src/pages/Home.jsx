import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getFeedbacks, submitFeedback } from "../services/api";
import styles from './HomeNew.module.css';

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);

  const loadFeedbacks = async () => {
    try {
      const res = await getFeedbacks(user?.role);
      const data = res.data.feedbacks || res.data;
      setFeedbacks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
      setFeedbacks([]);
    }
  };

  // Fetch feedbacks on component mount and when user changes
  useEffect(() => {
    if (user) {
      loadFeedbacks();
    }
  }, [user]);

  // Submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please sign in for giving the feedback");
    if (!feedback) return alert("Please enter your feedback");

    try {
      await submitFeedback({ text: feedback, rating });
      setFeedback("");
      setRating(5);
      alert("Feedback submitted!");

      // Refresh feedbacks
      await loadFeedbacks();
    } catch (error) {
      console.error("Submit feedback error:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.homeContainer}>
        {/* Main Title */}
        <h2 className={styles.title}>
          Customer Feedback Portal
        </h2>

        {/* Welcome Text */}
        <h3 className={styles.welcomeText}>
          Welcome, <span className={styles.username}>{user?.name || user?.email || 'Guest'}</span> 👋
        </h3>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Your Feedback:</label>
            <textarea
              className={styles.textarea}
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Rating:</label>
            <select
              className={styles.select}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r !== 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit Feedback
          </button>
        </form>

        {/* Feedback Section */}
        <div className={styles.feedbackSection}>
          <h4 className={styles.sectionTitle}>Feedbacks:</h4>
          {feedbacks.length === 0 ? (
            <p className={styles.noFeedback}>No feedbacks yet. Submit one above!</p>
          ) : (
            feedbacks.map((f, i) => (
              <div key={i} className={styles.feedbackCard}>
                <p>
                  <strong>{f.user?.name || user?.name || user?.email || 'Anonymous'}:</strong>{" "}
                  {f.text}
                </p>
                <div className={styles.rating}>
                  ⭐ Rating: {f.rating}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          Made by <strong>Arya Jain</strong> — Customer Feedback Portal
        </footer>
      </div>
    </div>
  );
}

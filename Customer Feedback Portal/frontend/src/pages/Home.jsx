import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);

  // Fetch all feedbacks (admin) or user feedbacks
  const fetchFeedbacks = async () => {
  try {
    console.log("Fetching feedbacks for:", user?.role);
    const { data } = await API.get(
      user?.role === "admin" ? "/feedback" : "/feedback/my"
    );
    setFeedbacks(data);
  } catch (error) {
    console.error("Failed to fetch feedbacks", error);
    alert("Failed to fetch feedbacks");
  }
};

  // Submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/feedback", { message, rating });
      alert("Feedback submitted!");
      setMessage("");
      setRating(5);
      fetchFeedbacks(); // refresh list
    } catch (error) {
      console.error("Submit feedback error:", error);
      alert("Failed to submit feedback");
    }
  };

  useEffect(() => {
    if (user) fetchFeedbacks();
  }, [user]);

  return (
    <div>
      <h2>Welcome {user?.name}</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your feedback..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      <h3>Feedbacks:</h3>
      {feedbacks.length > 0 ? (
        <ul>
          {feedbacks.map((fb) => (
            <li key={fb._id}>
              <strong>{fb.user?.name || "Anonymous"}:</strong> {fb.message} (⭐{fb.rating})
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedbacks yet.</p>
      )}
    </div>
  );
};

export default Home;

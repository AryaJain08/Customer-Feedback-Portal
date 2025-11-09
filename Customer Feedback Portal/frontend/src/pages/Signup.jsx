import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/register", form);

      if (data && data.token) {
        login(data);
        navigate("/");
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("🔥 Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed. Please check your input.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="auth-container">
        <h2 style={{ marginBottom: "10px" }}>Create Your Account</h2>
        <p style={{ marginBottom: "25px", color: "#64748b" }}>
          Join the <strong>Customer Feedback Portal</strong> and start sharing your thoughts!
        </p>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" style={{ marginTop: "15px", width: "100%" }}>
            Sign Up
          </button>
        </form>

        <p style={{ marginTop: "25px", fontSize: "14px", color: "#64748b" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#4a6cf7", fontWeight: "600" }}>
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

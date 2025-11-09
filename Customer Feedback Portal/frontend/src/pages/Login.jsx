import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);

      if (data && data.token) {
        login(data);
        navigate("/");
      } else {
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("🔥 Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="auth-container">
        <h2>Welcome Back</h2>
        <p style={{ marginBottom: "25px", color: "#64748b" }}>
          Log in to continue to your{" "}
          <strong>Customer Feedback Portal</strong>.
        </p>

        <form onSubmit={handleSubmit}>
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
            Log In
          </button>
        </form>

        <p style={{ marginTop: "25px", fontSize: "14px", color: "#64748b" }}>
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#4a6cf7", fontWeight: "600" }}>
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

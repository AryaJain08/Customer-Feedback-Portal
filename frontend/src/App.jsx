import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import "./index.css";

export default function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="app-background">
      {/* Navbar */}
      <header className="navbar">
        <h1>Customer Feedback Portal</h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          {!user && <Link to="/signup">Signup</Link>}
          {!user && <Link to="/login">Login</Link>}
          {user && user.role === "admin" && <Link to="/admin">Admin</Link>}
          {user && (
            <button
              onClick={logout}
              className="logout-btn"
              style={{ marginLeft: "12px" }}
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="content">
        <div className="glass-card">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        Made by <strong>Arya Jain</strong> — Customer Feedback Portal
      </footer>
    </div>
  );
}

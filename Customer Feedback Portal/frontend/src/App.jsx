import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import "./index.css";

export default function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container">
      <header>
        <h1>Customer Feedback Portal</h1>
        <nav>
          <Link to="/">Home</Link>
          {!user && <Link to="/signup">Signup</Link>}
          {!user && <Link to="/login">Login</Link>}
          {user && user.role === "admin" && <Link to="/admin">Admin</Link>}
          {user && (
            <button
              style={{ marginLeft: 10 }}
              onClick={logout}
            >
              Logout
            </button>
          )}
        </nav>
      </header>
      <hr />
      <main>
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
      </main>
      <div className="footer">Made by Arya Jain — Customer Feedback Portal</div>
    </div>
  );
}

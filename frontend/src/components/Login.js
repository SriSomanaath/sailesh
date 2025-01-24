import React, { useState } from "react";
import axios from "axios";
import "./../index.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", { username, password });
      onLogin(response.data);
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form">
          <h2 className="login-title">Login</h2>
          <p className="login-subtitle">Login to access your bank account</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" className="checkbox-input" />
                Remember me
              </label>
              <a href="#" className="forgot-password-link">
                Forgot Password
              </a>
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
          </form>
          <p className="error-message">{message}</p>
        </div>
        <div className="login-illustration">
          <img
            src="illustration-placeholder.jpg"
            alt="Secure Login Illustration"
            className="illustration-img"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;

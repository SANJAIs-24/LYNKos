import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: new URLSearchParams({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        onLoginSuccess({ username: data.username, email: data.email });
        navigate("/home");
      } else {
        setError(data.detail || data.error || "Login failed");
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      <div className="small-row">
        <Link to="/forgot-password">Forgot Password?</Link>
        <Link to="/signup">Sign up</Link>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

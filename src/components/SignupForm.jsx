import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        body: new URLSearchParams({ username, email, password }),
      });
      const data = await res.json();
      setMsg(data.message || data.error);
      if (res.ok) setTimeout(() => navigate("/login"), 1000);
    } catch {
      setMsg("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username (unique)"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Create account</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}

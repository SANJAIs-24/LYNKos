import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("http://localhost:8000/forgot-password", {
        method: "POST",
        body: new URLSearchParams({ email }),
      });
      const data = await res.json();
      setMsg(data.message || data.error);
      if (res.ok) setTimeout(() => navigate("/verify-otp", { state: { email } }), 800);
    } catch {
      setMsg("Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Forgot Password</h2>
      <input type="email" placeholder="Your registered email" value={email} onChange={e => setEmail(e.target.value)} required />
      <button type="submit">Send OTP</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}

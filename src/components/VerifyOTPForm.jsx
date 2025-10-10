import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOTPForm() {
  const loc = useLocation();
  const preEmail = loc.state?.email || "";
  const [email, setEmail] = useState(preEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("http://localhost:8000/verify-otp", {
        method: "POST",
        body: new URLSearchParams({ email, otp, new_password: newPassword }),
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
      <h2>Verify OTP</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="text" placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)} required />
      <input type="password" placeholder="New password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
      <button type="submit">Reset Password</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}

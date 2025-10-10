import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import VerifyOTPForm from "./components/VerifyOTPForm";
import Desktop from "./components/Desktop";

export default function App() {
  const [userEmail, setUserEmail] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm onLoginSuccess={(data) => setUserEmail(data.email)} />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/verify-otp" element={<VerifyOTPForm />} />
        <Route path="/home" element={userEmail ? <Desktop userEmail={userEmail} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

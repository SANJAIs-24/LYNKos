import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="center">
      <h1>Welcome to LYNKos</h1>
      <p>Web OS prototype — login or create an account to continue.</p>
      <div className="row">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/signup"><button>Sign Up</button></Link>
      </div>
    </div>
  );
}

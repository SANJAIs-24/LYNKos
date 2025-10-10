import React from "react";
import "../styles/taskbar.css";

export default function Taskbar() {
  return (
    <div className="taskbar">
      <button className="start-btn">⊞ Start</button>
      <div className="taskbar-right">🕒 12:00</div>
    </div>
  );
}

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Desktop from "./components/Desktop";
import Taskbar from "./components/Taskbar";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={setUser} />} />
        <Route path="/home" element={
          user ? (
            <>
              <Desktop />
              <Taskbar />
            </>
          ) : (
            <Login onLogin={setUser} />
          )
        } />
      </Routes>
    </Router>
  );
}

export default App;

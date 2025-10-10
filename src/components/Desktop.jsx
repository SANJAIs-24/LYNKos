import React, { useState, useEffect, useRef } from "react";
import "./desktop.css";

const STORAGE_KEY = "lynkos_icons_v1";

const initialIcons = [
  { id: "pc", name: "File Manager", emoji: "🖥️", x: 40, y: 120 },
  { id: "notes", name: "Notes", emoji: "🗒️", x: 40, y: 220 },
  { id: "browser", name: "Browser", emoji: "🌐", x: 40, y: 320 },
];

export default function Desktop({ user }) {
  const desktopRef = useRef(null);
  const [icons, setIcons] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : initialIcons;
    } catch {
      return initialIcons;
    }
  });
  const [draggingId, setDraggingId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(icons));
    } catch {}
  }, [icons]);

  const pointerDown = (e, id) => {
    const rect = desktopRef.current.getBoundingClientRect();
    const px = e.clientX ?? (e.touches && e.touches[0].clientX);
    const py = e.clientY ?? (e.touches && e.touches[0].clientY);
    const icon = icons.find((it) => it.id === id);
    if (!icon) return;
    setOffset({ x: px - (icon.x + rect.left), y: py - (icon.y + rect.top) });
    setDraggingId(id);
  };

  const pointerMove = (e) => {
    if (!draggingId) return;
    const rect = desktopRef.current.getBoundingClientRect();
    const px = e.clientX ?? (e.touches && e.touches[0].clientX);
    const py = e.clientY ?? (e.touches && e.touches[0].clientY);
    const newX = Math.max(8, px - rect.left - offset.x);
    const newY = Math.max(48, py - rect.top - offset.y);
    setIcons((prev) => prev.map((it) => (it.id === draggingId ? { ...it, x: newX, y: newY } : it)));
  };

  const pointerUp = () => setDraggingId(null);

  const onIconDoubleClick = (id) => {
    if (id === "pc") {
      alert("Opening File Manager (placeholder)");
      return;
    }
    if (id === "browser") {
      window.open("https://example.com", "_blank");
      return;
    }
    alert(`Opening ${id} (placeholder)`);
  };

  return (
    <div
      className="lynkos-desktop"
      ref={desktopRef}
      onMouseMove={pointerMove}
      onMouseUp={pointerUp}
      onTouchMove={pointerMove}
      onTouchEnd={pointerUp}
    >
      <div className="lynkos-wallpaper">
        <div className="os-logos">
          <div className="logo win">WINDOWS</div>
          <div className="logo android">ANDROID</div>
          <div className="logo linux">LINUX</div>
        </div>
      </div>

      {/* render icons from state (only one PC icon here) */}
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="desktop-icon"
          style={{ left: icon.x, top: icon.y }}
          onMouseDown={(e) => pointerDown(e, icon.id)}
          onTouchStart={(e) => pointerDown(e, icon.id)}
          onDoubleClick={() => onIconDoubleClick(icon.id)}
          role="button"
          tabIndex={0}
        >
          <div className="icon-emoji">{icon.emoji}</div>
          <div className="icon-label">{icon.name}</div>
        </div>
      ))}

      <div className="clock">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </div>

      <div className="welcome">
        {user ? (
          <>
            <div>Welcome, <strong>{user.username}</strong></div>
            <div className="sub">{user.email}</div>
          </>
        ) : (
          <div>Welcome to LYNKos</div>
        )}
      </div>
    </div>
  );
}

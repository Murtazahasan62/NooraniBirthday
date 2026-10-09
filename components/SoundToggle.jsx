"use client";
import { useEffect, useState } from "react";
import { setSoundEnabled, sfx } from "@/lib/sound";

export default function SoundToggle() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bday-sound");
      if (saved === "off") {
        setOn(false);
        setSoundEnabled(false);
      }
    } catch {}
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    setSoundEnabled(next);
    try { localStorage.setItem("bday-sound", next ? "on" : "off"); } catch {}
    if (next) sfx.tap();
  };

  return (
    <button className="icon-btn sound-toggle" onClick={toggle} aria-pressed={on} aria-label={on ? "Mute sound" : "Unmute sound"}>
      {on ? (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16.5 8.5a5 5 0 0 1 0 7" /><path d="M19 6a8.5 8.5 0 0 1 0 12" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M17 9l5 6M22 9l-5 6" />
        </svg>
      )}
    </button>
  );
}

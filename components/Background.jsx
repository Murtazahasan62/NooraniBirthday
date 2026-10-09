"use client";
import { useEffect, useRef } from "react";
import { Sticker } from "./Illustrations";
import { fireConfetti } from "@/lib/confetti";
import { sfx } from "@/lib/sound";

// x/y in %, s = size px, d = float delay, depth = parallax strength, tap = secret-capable
const STICKERS = [
  { k: "star", x: 6, y: 13, s: 46, d: 0, depth: 14, tap: true },
  { k: "heart", x: 86, y: 9, s: 34, d: 1.2, depth: 10 },
  { k: "balloon", x: 88, y: 50, s: 54, d: 0.6, depth: 18, tap: true },
  { k: "sparkle", x: 5, y: 60, s: 32, d: 2, depth: 8, tap: true },
  { k: "cloud", x: 66, y: 88, s: 82, d: 1.6, depth: 22 },
  { k: "balloon2", x: 3, y: 82, s: 46, d: 0.3, depth: 16 },
  { k: "sparkle", x: 80, y: 28, s: 22, d: 0.9, depth: 6 },
  { k: "heart", x: 14, y: 36, s: 22, d: 2.4, depth: 12 },
];

export default function Background({ onSticker }) {
  const rootRef = useRef(null);

  // Subtle pointer parallax (desktop only; harmless on touch devices).
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const move = (e) => {
      if (e.pointerType === "touch") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--px", (e.clientX / window.innerWidth - 0.5).toFixed(3));
        el.style.setProperty("--py", (e.clientY / window.innerHeight - 0.5).toFixed(3));
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const tapSticker = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    fireConfetti({
      x: (r.left + r.width / 2) / window.innerWidth,
      y: (r.top + r.height / 2) / window.innerHeight,
      count: 24, power: 7,
    });
    sfx.pop();
    onSticker?.();
  };

  return (
    <div className="bg" ref={rootRef} aria-hidden={false}>
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <div className="blob blob-c" />
      {STICKERS.map((s, i) => {
        const style = {
          left: `${s.x}%`, top: `${s.y}%`, width: s.s,
          "--depth": `${s.depth}px`, "--d": `${s.d}s`,
        };
        const inner = <span className="sticker-float"><Sticker k={s.k} /></span>;
        return s.tap ? (
          <button key={i} className="sticker sticker-tap" style={style} onClick={tapSticker} aria-label="Decorative sticker. Tap it.">
            {inner}
          </button>
        ) : (
          <span key={i} className="sticker" style={style} aria-hidden="true">{inner}</span>
        );
      })}
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";
import { subscribeConfetti } from "@/lib/confetti";

const COLORS = ["#ff8fb1", "#b79cff", "#ffb78f", "#9be7d0", "#ffe28a", "#ffffff", "#8fc9ff"];

// Lightweight canvas confetti. The animation loop only runs while particles exist.
export default function Confetti() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const c = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    let parts = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loop = () => {
      c.clearRect(0, 0, w, h);
      parts = parts.filter((p) => p.life > 0 && p.y < h + 30);
      for (const p of parts) {
        p.vy += p.g;
        p.vx *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 1;
        c.save();
        c.translate(p.x, p.y);
        c.rotate(p.rot);
        c.globalAlpha = Math.min(1, p.life / 25);
        c.fillStyle = p.color;
        if (p.shape === 0) c.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        else {
          c.beginPath();
          c.arc(0, 0, p.size / 3, 0, Math.PI * 2);
          c.fill();
        }
        c.restore();
      }
      if (parts.length) raf = requestAnimationFrame(loop);
      else {
        raf = 0;
        c.clearRect(0, 0, w, h);
      }
    };

    const add = (o) => {
      const {
        x = 0.5, y = 0.5, count = 60, spread = Math.PI * 2,
        angle = -Math.PI / 2, power = 11, gravity = 0.28, rain = false,
      } = o;
      const n = Math.min(reduce ? Math.ceil(count * 0.3) : count, 200);
      for (let i = 0; i < n; i++) {
        const a = angle + (Math.random() - 0.5) * spread;
        const v = power * (0.4 + Math.random() * 0.7);
        parts.push({
          x: rain ? Math.random() * w : x * w,
          y: rain ? -20 - Math.random() * 120 : y * h,
          vx: rain ? (Math.random() - 0.5) * 2 : Math.cos(a) * v,
          vy: rain ? 2 + Math.random() * 3 : Math.sin(a) * v,
          g: rain ? 0.05 : gravity,
          rot: Math.random() * 6,
          vr: (Math.random() - 0.5) * 0.3,
          size: 8 + Math.random() * 8,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          shape: Math.random() < 0.65 ? 0 : 1,
          life: rain ? 260 : 110 + Math.random() * 40,
        });
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);
    const unsub = subscribeConfetti(add);
    return () => {
      unsub();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="confetti" aria-hidden="true" />;
}

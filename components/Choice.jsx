"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "@/config/content";
import { stageMotion } from "@/lib/motion";
import { sfx } from "@/lib/sound";
import { fireConfetti } from "@/lib/confetti";

const C = CONFIG.choice;
// Where the chaos button dodges to (kept small so it never leaves the arena on a phone).
const DODGES = [
  { x: 40, y: -34 },
  { x: -40, y: 36 },
  { x: 30, y: -52 },
];

export default function Choice({ choice, onChoose, onNext }) {
  const [attempts, setAttempts] = useState(0);

  const pickNice = () => {
    sfx.chime();
    fireConfetti({ x: 0.5, y: 0.5, count: 70, power: 9, gravity: 0.2 });
    onChoose("nice");
  };

  const pickChaos = () => {
    if (attempts < DODGES.length) {
      sfx.boing();
      setAttempts((a) => a + 1);
      return;
    }
    sfx.tada();
    onChoose("chaos");
    fireConfetti({ rain: true, count: 150 });
    fireConfetti({ x: 0.1, y: 0.9, angle: -Math.PI / 3, spread: 0.9, count: 70, power: 17 });
    fireConfetti({ x: 0.9, y: 0.9, angle: (-2 * Math.PI) / 3, spread: 0.9, count: 70, power: 17 });
  };

  if (choice) {
    const r = choice === "nice" ? C.niceResult : C.chaosResult;
    return (
      <motion.section className={`card result ${choice === "chaos" ? "chaos-wobble" : "nice-glow"}`} {...stageMotion}>
        <h2 className="display">{r.title}</h2>
        <p className="hand lead">{r.body}</p>
        <button className="btn btn-primary" onClick={() => { sfx.whoosh(); onNext(); }}>{C.next}</button>
      </motion.section>
    );
  }

  const pos = attempts === 0 ? { x: 0, y: 0 } : DODGES[Math.min(attempts, DODGES.length) - 1];
  const label = C.chaosLabels[Math.min(attempts, C.chaosLabels.length - 1)];

  return (
    <motion.section className="card choice" {...stageMotion}>
      <h2 className="display">{C.intro}</h2>
      <div className="arena">
        <button className="btn btn-primary" onClick={pickNice}>{C.nice}</button>
        <motion.button
          className="btn btn-chaos"
          onClick={pickChaos}
          animate={pos}
          transition={{ type: "spring", stiffness: 380, damping: 15 }}
          whileTap={{ scale: 0.94 }}
        >
          {label}
        </motion.button>
      </div>
      <p className={`tiny-hint ${attempts >= 2 ? "show" : ""}`} aria-live="polite">{attempts >= 2 ? C.hint : "\u00a0"}</p>
    </motion.section>
  );
}

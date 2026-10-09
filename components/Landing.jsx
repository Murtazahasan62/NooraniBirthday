"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "@/config/content";
import { stageMotion } from "@/lib/motion";
import { sfx } from "@/lib/sound";

export default function Landing({ onNext, onSecret }) {
  const [taps, setTaps] = useState(0);
  const L = CONFIG.landing;

  const pokeTitle = () => {
    const n = taps + 1;
    setTaps(n);
    sfx.tap();
    if (n === 3) onSecret("title");
  };

  return (
    <motion.section className="card landing" {...stageMotion}>
      <h1 className="display" onClick={pokeTitle}>
        {L.line1}
      </h1>
      <svg className="squiggle" viewBox="0 0 220 14" aria-hidden="true">
        <path d="M4 8Q22 0 40 8T76 8T112 8T148 8T184 8T216 8" fill="none" stroke="#ff8fb1" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <p className="hand lead">{L.line2}</p>
      <button
        className="btn btn-primary"
        onClick={() => {
          sfx.whoosh();
          onNext();
        }}
      >
        {L.cta}
      </button>
    </motion.section>
  );
}

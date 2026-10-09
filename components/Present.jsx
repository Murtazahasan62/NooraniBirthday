"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "@/config/content";
import { stageMotion } from "@/lib/motion";
import { sfx } from "@/lib/sound";
import { fireConfetti } from "@/lib/confetti";
import { GiftBox } from "./Illustrations";

export default function Present({ onDone }) {
  const lines = CONFIG.present.pokeLines;
  const [taps, setTaps] = useState(0);
  const [opened, setOpened] = useState(false);
  const [line, setLine] = useState(CONFIG.present.hint);

  const tap = () => {
    if (opened) return;
    const n = taps + 1;
    setTaps(n);
    setLine(lines[Math.min(n, lines.length) - 1]);
    if (n >= lines.length) {
      setOpened(true);
      sfx.open();
      fireConfetti({ x: 0.5, y: 0.45, count: 90, power: 13 });
      setTimeout(onDone, 1500);
    } else {
      sfx.boing();
    }
  };

  return (
    <motion.section className="gift-stage" {...stageMotion}>
      <p className="hand speech" aria-live="polite">{line}</p>
      <motion.button
        className="box-btn"
        onClick={tap}
        whileTap={{ scale: 0.92 }}
        aria-label={opened ? "Present opened" : "Present. Tap to poke it."}
      >
        <motion.div
          key={taps}
          animate={taps ? { rotate: [0, -9, 9, -6, 6, 0], scale: [1, 1.07, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <GiftBox wrap="#ff8fb1" ribbon="#fff7fb" opened={opened} className={`big ${taps === 0 ? "idle" : ""}`} />
        </motion.div>
      </motion.button>
      {!opened && <p className="tiny-hint">Tap it. It reacts.</p>}
    </motion.section>
  );
}

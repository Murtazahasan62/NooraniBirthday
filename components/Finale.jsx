"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CONFIG, fill } from "@/config/content";
import { stageMotion } from "@/lib/motion";
import { sfx } from "@/lib/sound";
import { fireConfetti } from "@/lib/confetti";
import { Cake } from "./Illustrations";

const F = CONFIG.finale;

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 140, damping: 16 } },
};

export default function Finale({ choice, secretsFound, onSecret, onReplay }) {
  const [lit, setLit] = useState(true);
  const [signTaps, setSignTaps] = useState(0);

  useEffect(() => {
    sfx.tada();
    const t = [
      setTimeout(() => fireConfetti({ x: 0.2, y: 0.7, angle: -1.2, spread: 0.9, count: 80, power: 17 }), 150),
      setTimeout(() => fireConfetti({ x: 0.8, y: 0.7, angle: -1.95, spread: 0.9, count: 80, power: 17 }), 350),
      setTimeout(() => fireConfetti({ rain: true, count: 90 }), 700),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  const blow = () => {
    if (!lit) return;
    setLit(false);
    sfx.chime();
    fireConfetti({ x: 0.5, y: 0.55, count: 90, power: 12 });
  };

  const tapSign = () => {
    sfx.pop();
    const n = signTaps + 1;
    setSignTaps(n);
    if (n === 3) onSecret("signoff");
  };

  const allFound = secretsFound >= CONFIG.secrets.total;

  return (
    <motion.section className="finale" {...stageMotion}>
      <motion.div className="card finale-card" initial="hidden" animate="show" transition={{ staggerChildren: 0.28, delayChildren: 0.3 }}>
        <motion.p className="hand lead" variants={item}>
          {choice === "chaos" ? F.introChaos : F.introNice}
        </motion.p>
        <motion.h2 className="display finale-title" variants={item}>{fill(F.headline)}</motion.h2>
        {F.lines.map((l, k) => (
          <motion.p className="finale-line" variants={item} key={k}>{l}</motion.p>
        ))}
        {CONFIG.personalNote && (
          <motion.p className="finale-line personal" variants={item}>{CONFIG.personalNote}</motion.p>
        )}

        <motion.div variants={item} className="cake-wrap">
          <button className="cake-btn" onClick={blow} aria-label={lit ? F.candleHint : F.wishLine}>
            <Cake lit={lit} />
          </button>
          <p className="hand speech" aria-live="polite">{lit ? F.candleHint : F.wishLine}</p>
        </motion.div>

        {CONFIG.photo && (
          <motion.figure variants={item} className="polaroid">
            <img src={CONFIG.photo} alt="" loading="lazy" />
            <figcaption className="hand">{CONFIG.photoCaption}</figcaption>
          </motion.figure>
        )}

        {CONFIG.insideJokes.length > 0 && (
          <motion.div variants={item} className="jokes">
            {CONFIG.insideJokes.map((j, k) => (
              <span key={k} className="joke">{j}</span>
            ))}
          </motion.div>
        )}

        <motion.button variants={item} className="signoff hand" onClick={tapSign}>
          {fill(F.signoff)}
        </motion.button>

        {allFound && <motion.p variants={item} className="bonus">{F.secretBonus}</motion.p>}

        <motion.button variants={item} className="btn btn-soft" onClick={() => { sfx.tap(); onReplay(); }}>
          {F.replay}
        </motion.button>
      </motion.div>
    </motion.section>
  );
}

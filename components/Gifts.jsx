"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONFIG } from "@/config/content";
import { stageMotion } from "@/lib/motion";
import { sfx } from "@/lib/sound";
import { fireConfetti } from "@/lib/confetti";
import { GiftBox, ITEMS } from "./Illustrations";

const layers = CONFIG.layers;
const fake = CONFIG.fakeout;
const S = CONFIG.secrets;

function FakeLoader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [step, setStep] = useState(0); // 0 loading, 1 stuck, 2 kidding, 3 reveal

  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(99, p + 3 + Math.random() * 5);
      setPct(Math.round(p));
      if (p >= 99) {
        clearInterval(iv);
        setStep(1);
      }
    }, 90);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (step === 1) {
      const t = setTimeout(() => setStep(2), 1500);
      return () => clearTimeout(t);
    }
    if (step === 2) {
      sfx.pop();
      const t = setTimeout(() => setStep(3), 900);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <motion.div className="card fake" {...stageMotion}>
      <p className="hand lead">{fake.title}</p>
      <div className="loader" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <span style={{ width: `${pct}%` }} />
      </div>
      <p className="loader-num">{pct}%</p>
      <div className="fake-text" aria-live="polite">
        {step === 1 && <p>{fake.stuck}</p>}
        {step >= 2 && <p className="display sm">{fake.reveal}</p>}
        {step >= 3 && <p className="hand lead">{fake.reveal2}</p>}
      </div>
      {step >= 3 && (
        <motion.button className="btn btn-primary" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} onClick={() => { sfx.tap(); onDone(); }}>
          {fake.cta}
        </motion.button>
      )}
    </motion.div>
  );
}

export default function Gifts({ onDone, onSecret, toast }) {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState("closed"); // closed | open | fakeout
  const [duckTaps, setDuckTaps] = useState(0);
  const layer = layers[i];
  const Item = ITEMS[layer.item];
  const collected = layers.slice(0, phase === "closed" ? i : i + 1);
  // after the fake-out, the current layer has been collected already
  const shelf = phase === "fakeout" ? layers.slice(0, i + 1) : collected;

  const openBox = () => {
    sfx.open();
    fireConfetti({ x: 0.5, y: 0.4, count: 45, power: 10 });
    setPhase("open");
  };

  const next = () => {
    sfx.pop();
    if (i === layers.length - 1) return onDone();
    if (i === fake.afterLayer) return setPhase("fakeout");
    setI(i + 1);
    setPhase("closed");
  };

  const tapDuck = () => {
    if (layer.item !== "duck") return;
    sfx.quack();
    const n = duckTaps + 1;
    setDuckTaps(n);
    if (n === 1) toast(S.duckQuack);
    if (n === 3) {
      onSecret("duck");
      toast(S.duckComplaint);
    }
  };

  const tapShelf = () => {
    sfx.pop();
    onSecret("shelf");
    toast(S.shelfQuips[Math.floor(Math.random() * S.shelfQuips.length)]);
  };

  const boxSize = 240 - i * 20;

  return (
    <section className="gift-stage">
      <AnimatePresence mode="wait">
        {phase === "closed" && (
          <motion.div key={`box-${i}`} className="gift-block" initial={{ opacity: 0, scale: 0.3, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 14 } }} exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.18 } }}>
            <p className="hand speech">{i === 0 ? "Okay, there's a box inside the box." : "Tap to open."}</p>
            <button className="box-btn" onClick={openBox} style={{ width: boxSize }} aria-label={`Open box ${i + 1}`}>
              <GiftBox wrap={layer.wrap} ribbon={layer.ribbon} className="idle" />
            </button>
          </motion.div>
        )}

        {phase === "open" && (
          <motion.div key={`open-${i}`} className="card reveal" {...stageMotion}>
            <motion.button
              className="item-art"
              onClick={tapDuck}
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: 0, transition: { type: "spring", stiffness: 220, damping: 12 } }}
              whileTap={{ scale: 0.88, rotate: 8 }}
              aria-label={layer.title}
            >
              <Item />
            </motion.button>
            <h2 className="display sm">{layer.title}</h2>
            <p className="hand lead">{layer.caption}</p>
            <button className="btn btn-primary" onClick={next}>{layer.next}</button>
          </motion.div>
        )}

        {phase === "fakeout" && (
          <FakeLoader key="fake" onDone={() => { setI(i + 1); setPhase("closed"); }} />
        )}
      </AnimatePresence>

      {shelf.length > 0 && (
        <div className="shelf" aria-label="Your collection of gifts so far">
          {shelf.map((l) => {
            const Mini = ITEMS[l.item];
            return (
              <motion.button key={l.id} className="shelf-item" onClick={tapShelf} initial={{ scale: 0 }} animate={{ scale: 1 }} whileTap={{ rotate: 14, scale: 1.15 }} aria-label={`Collected: ${l.title}`}>
                <Mini />
              </motion.button>
            );
          })}
        </div>
      )}
    </section>
  );
}

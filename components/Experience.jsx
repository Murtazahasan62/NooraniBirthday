"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { CONFIG } from "@/config/content";
import { useProgress } from "@/lib/useProgress";
import Background from "./Background";
import Confetti from "./Confetti";
import SoundToggle from "./SoundToggle";
import Landing from "./Landing";
import Present from "./Present";
import Gifts from "./Gifts";
import Choice from "./Choice";
import Finale from "./Finale";

export default function Experience() {
  const { state, ready, setStage, setChoice, findSecret, replay } = useProgress();
  const [toastMsg, setToastMsg] = useState(null);

  const toast = useCallback((text) => setToastMsg({ text, id: Math.random() }), []);

  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToastMsg(null), 2400);
    return () => clearTimeout(t);
  }, [toastMsg]);

  const onSecret = useCallback(
    (id) => {
      if (findSecret(id)) toast(CONFIG.secrets.foundToast[id]);
    },
    [findSecret, toast]
  );

  const onSticker = useCallback(() => {
    if (findSecret("sticker")) return toast(CONFIG.secrets.foundToast.sticker);
    const q = CONFIG.secrets.stickerQuips;
    toast(q[Math.floor(Math.random() * q.length)]);
  }, [findSecret, toast]);

  const found = state.secrets.length;

  return (
    <MotionConfig reducedMotion="user">
      <main className="app">
        <Background onSticker={onSticker} />
        <Confetti />
        <SoundToggle />

        {found > 0 && (
          <div className="chip" aria-live="polite">✨ {found}/{CONFIG.secrets.total} secrets</div>
        )}

        <AnimatePresence>
          {toastMsg && (
            <motion.div key={toastMsg.id} className="toast" role="status" initial={{ opacity: 0, y: -12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }}>
              {toastMsg.text}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="stage">
          {ready && (
            <AnimatePresence mode="wait">
              {state.stage === "landing" && (
                <Landing key="landing" onNext={() => setStage("present")} onSecret={onSecret} />
              )}
              {state.stage === "present" && (
                <Present key="present" onDone={() => setStage("gifts")} />
              )}
              {state.stage === "gifts" && (
                <Gifts key="gifts" onDone={() => setStage("choice")} onSecret={onSecret} toast={toast} />
              )}
              {state.stage === "choice" && (
                <Choice key="choice" choice={state.choice} onChoose={setChoice} onNext={() => setStage("finale")} />
              )}
              {state.stage === "finale" && (
                <Finale key="finale" choice={state.choice} secretsFound={found} onSecret={onSecret} onReplay={replay} />
              )}
            </AnimatePresence>
          )}
        </div>
      </main>
    </MotionConfig>
  );
}

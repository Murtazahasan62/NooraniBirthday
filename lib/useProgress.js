"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const KEY = "bday-progress-v1";
const initial = { stage: "landing", choice: null, secrets: [] };

// Remembers progress for the current browser session only (sessionStorage).
export function useProgress() {
  const [state, setState] = useState(initial);
  const [ready, setReady] = useState(false);
  const ref = useRef(state);
  ref.current = state;

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) setState({ ...initial, ...JSON.parse(raw) });
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  }, [state, ready]);

  const setStage = useCallback((stage) => setState((p) => ({ ...p, stage })), []);
  const setChoice = useCallback((choice) => setState((p) => ({ ...p, choice })), []);
  const findSecret = useCallback((id) => {
    if (ref.current.secrets.includes(id)) return false;
    ref.current = { ...ref.current, secrets: [...ref.current.secrets, id] };
    setState((p) =>
      p.secrets.includes(id) ? p : { ...p, secrets: [...p.secrets, id] }
    );
    return true;
  }, []);
  const replay = useCallback(
    () => setState((p) => ({ ...p, stage: "present", choice: null })),
    []
  );

  return { state, ready, setStage, setChoice, findSecret, replay };
}

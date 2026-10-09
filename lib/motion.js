// Shared stage transition so every screen enters/exits the same way.
export const stageMotion = {
  initial: { opacity: 0, y: 28, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 160, damping: 18 } },
  exit: { opacity: 0, y: -24, scale: 0.96, transition: { duration: 0.25 } },
};

"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";

type Ctx = {
  recruiter: boolean;
  toggleRecruiter: () => void;
  commandOpen: boolean;
  setCommandOpen: (v: boolean) => void;
};

const AppCtx = createContext<Ctx | null>(null);

// Recruiter preference lives in localStorage (browser only; nothing is sent anywhere).
const RECRUITER_EVENT = "recruiter-mode-change";
function readRecruiter() {
  try {
    return localStorage.getItem("recruiter-mode") === "1";
  } catch {
    return false;
  }
}
function subscribeRecruiter(cb: () => void) {
  window.addEventListener(RECRUITER_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(RECRUITER_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp must be used inside AppProvider");
  return c;
}

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const recruiter = useSyncExternalStore(subscribeRecruiter, readRecruiter, () => false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.recruiter = recruiter ? "true" : "false";
  }, [recruiter]);

  // Cmd/Ctrl + K opens the command center.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleRecruiter = useCallback(() => {
    try {
      localStorage.setItem("recruiter-mode", readRecruiter() ? "0" : "1");
    } catch {}
    window.dispatchEvent(new Event(RECRUITER_EVENT));
  }, []);
  const value = useMemo(
    () => ({ recruiter, toggleRecruiter, commandOpen, setCommandOpen }),
    [recruiter, toggleRecruiter, commandOpen],
  );

  return (
    <AppCtx.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </AppCtx.Provider>
  );
}

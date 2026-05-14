"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

function subscribeDesktopMatch(cb: () => void) {
  const mq = window.matchMedia("(min-width: 768px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getDesktopMatch() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function getServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribeDesktopMatch,
    getDesktopMatch,
    getServerSnapshot
  );

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const leave = () => setHidden(true);
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("a,button,[role='button'],input,textarea,select")) {
        setHover(true);
      } else {
        setHover(false);
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseover", over);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        opacity: hidden ? 0 : 1,
      }}
      aria-hidden
    >
      <div
        className="rounded-full border border-primary/80 transition-all duration-300 ease-in-out"
        style={{
          width: hover ? 40 : 22,
          height: hover ? 40 : 22,
        }}
      />
    </div>
  );
}

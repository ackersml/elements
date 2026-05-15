"use client";

import { useEffect } from "react";

export function useFadeUp() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".fade-up");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("in");
        }
      },
      { threshold: 0.12 }
    );
    for (const el of els) io.observe(el);
    return () => io.disconnect();
  }, []);
}

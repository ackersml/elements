"use client";

import { useEffect, useRef } from "react";

/**
 * Small (~400KB) muted handpan loop that plays while on screen and pauses
 * when scrolled away. `muted` is set imperatively because React's `muted`
 * attribute is unreliable and would otherwise block autoplay.
 */
export function MoodLoopVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    const tryPlay = () => el.play().catch(() => {});
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else el.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label={label}
    />
  );
}

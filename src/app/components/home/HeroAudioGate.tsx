"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const src = process.env.NEXT_PUBLIC_HERO_AUDIO_URL;

export function HeroAudioGate() {
  const ref = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!src) return;
    const el = ref.current;
    if (!el) return;
    el.volume = 0.35;
    void el.play().catch(() => undefined);
  }, []);

  if (!src) return null;

  return (
    <div className="mt-10 inline-flex max-w-full flex-wrap items-center gap-4 rounded-full border border-border bg-card/60 py-2 pl-2 pr-5 backdrop-blur">
      <audio ref={ref} src={src} loop muted={muted} playsInline preload="metadata">
        <track kind="captions" srcLang="en" label="Handpan tone" />
      </audio>
      <button
        type="button"
        aria-label={muted ? "Play single tone" : "Pause"}
        onClick={() => {
          const next = !muted;
          setMuted(next);
          if (ref.current) {
            ref.current.muted = next;
            void ref.current.play();
          }
          setPlaying(!next);
        }}
        className="grid size-10 place-items-center rounded-full bg-[color:var(--accent-c)] text-[color:var(--background)]"
      >
        {playing && !muted ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
      </button>
      <span className="smallcaps text-muted-foreground">Tap to hear a single tone</span>
      <span className="hidden items-center gap-1 sm:flex">
        {[3, 5, 8, 12, 7, 4, 9, 6, 3].map((h, i) => (
          <span
            key={i}
            className={`w-[2px] rounded-full bg-[color:var(--accent-c)]/70 ${playing && !muted ? "animate-pulse" : ""}`}
            style={{ height: `${h * 1.2}px`, animationDelay: `${i * 80}ms` }}
          />
        ))}
      </span>
    </div>
  );
}

"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Set in env for real looped hero audio; otherwise strip matches Lovable (visual pulse only). */
const src = process.env.NEXT_PUBLIC_HERO_AUDIO_URL;

export function HeroAudioGate() {
  const ref = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  /** When no audio URL, Lovable-style decorative pulse only. */
  const [visualPlaying, setVisualPlaying] = useState(false);

  useEffect(() => {
    if (!src) return;
    const el = ref.current;
    if (!el) return;
    el.volume = 0.35;
    void el.play().catch(() => undefined);
  }, []);

  const barsActive = src ? playing && !muted : visualPlaying;

  return (
    <div className="mt-10 inline-flex max-w-full flex-wrap items-center gap-4 rounded-full border border-border bg-card/60 py-2 pl-2 pr-5 backdrop-blur">
      {src ? (
        <audio ref={ref} src={src} loop muted={muted} playsInline preload="metadata" />
      ) : null}
      <button
        type="button"
        aria-label={
          src
            ? muted
              ? "Play single tone"
              : "Pause"
            : visualPlaying
              ? "Pause tone visualizer"
              : "Play tone visualizer"
        }
        onClick={() => {
          if (src) {
            const next = !muted;
            setMuted(next);
            if (ref.current) {
              ref.current.muted = next;
              void ref.current.play();
            }
            setPlaying(!next);
          } else {
            setVisualPlaying((v) => !v);
          }
        }}
        className="grid size-10 place-items-center rounded-full bg-[color:var(--accent-c)] text-[color:var(--background)]"
      >
        {barsActive ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
      </button>
      <span className="smallcaps text-muted-foreground">
        {src ? "Tap to hear a single tone" : "Tap to pulse the tone strip"}
      </span>
      <span className="hidden items-center gap-1 sm:flex">
        {[3, 5, 8, 12, 7, 4, 9, 6, 3].map((h, i) => (
          <span
            key={i}
            className={`w-[2px] rounded-full bg-[color:var(--accent-c)]/70 ${barsActive ? "animate-pulse" : ""}`}
            style={{ height: `${h * 1.2}px`, animationDelay: `${i * 80}ms` }}
          />
        ))}
      </span>
    </div>
  );
}

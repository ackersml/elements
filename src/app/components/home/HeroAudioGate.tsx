"use client";

import { useEffect, useRef, useState } from "react";

const src = process.env.NEXT_PUBLIC_HERO_AUDIO_URL;

export function HeroAudioGate() {
  const ref = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!src) return;
    const el = ref.current;
    if (!el) return;
    el.volume = 0.35;
    void el.play().catch(() => undefined);
  }, []);

  if (!src) {
    return (
      <p className="mt-6 max-w-md text-xs uppercase tracking-[0.14em] text-muted-foreground/70">
        Set NEXT_PUBLIC_HERO_AUDIO_URL to a short looped tone for ceremonial landing audio (muted until unmute).
      </p>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
      <audio ref={ref} src={src} loop muted={muted} playsInline preload="metadata">
        <track kind="captions" srcLang="en" label="Handpan tone" />
      </audio>
      <button
        type="button"
        onClick={() => {
          setMuted((m) => !m);
          if (ref.current) ref.current.muted = !muted;
          void ref.current?.play();
        }}
        className="border border-border px-3 py-1.5 text-[11px] transition hover:border-primary/50"
      >
        {muted ? "Unmute atmosphere" : "Mute"}
      </button>
    </div>
  );
}

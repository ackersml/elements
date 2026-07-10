"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Homepage demo clip. Unlike the hero background, these load **paused** on a
 * poster still and only play — with sound — when the visitor clicks. Clicking
 * again pauses; starting one clip pauses any other that is playing so only a
 * single audio source is ever heard.
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
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      // Pause any other homepage clip so only one plays with sound at a time.
      document
        .querySelectorAll<HTMLVideoElement>("video[data-sound-video]")
        .forEach((v) => {
          if (v !== el) v.pause();
        });
      el.muted = false;
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  return (
    <div
      className={`sound-video ${className ?? ""}`}
      role="button"
      tabIndex={0}
      aria-label={playing ? `Pause ${label}` : `Play ${label} with sound`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <video
        ref={ref}
        data-sound-video
        className="absolute inset-0 h-full w-full object-cover object-center"
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      <span className={`sound-video__btn${playing ? " sound-video__btn--playing" : ""}`} aria-hidden>
        {playing ? <Pause size={20} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
      </span>
    </div>
  );
}

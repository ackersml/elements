"use client";

import Image from "next/image";
import { useReducedMotion } from "@/app/components/home/motion/useReducedMotion";

const HERO_VIDEO_ID = "vnY4LVVIccs";
const HERO_VIDEO_START = 45;
const HERO_POSTER = "/images/handpan-lifestyle-13.jpg";

function heroEmbedSrc(): string {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: HERO_VIDEO_ID,
    start: String(HERO_VIDEO_START),
    controls: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    iv_load_policy: "3",
    disablekb: "1",
    fs: "0",
    cc_load_policy: "0",
    enablejsapi: "1",
  });

  return `https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?${params.toString()}`;
}

export function HeroVideoBackground() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <Image
        src={HERO_POSTER}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    );
  }

  return (
    <>
      <Image
        src={HERO_POSTER}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden
      />
      <div className="hero-video-cover" aria-hidden>
        <iframe
          src={heroEmbedSrc()}
          title=""
          tabIndex={-1}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          loading="eager"
        />
      </div>
    </>
  );
}

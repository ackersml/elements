"use client";

import { useState } from "react";

type ProductVideoEmbedProps = {
  streamUrl: string;
  fallbackUrl: string;
  title: string;
  poster?: string;
};

export function ProductVideoEmbed({
  streamUrl,
  fallbackUrl,
  title,
  poster,
}: ProductVideoEmbedProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="product-video-frame flex aspect-square flex-col items-center justify-center gap-4 rounded-[var(--radius)] border border-[color:var(--hairline)] bg-[color:var(--surface-muted)] p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Video could not load in the browser.
        </p>
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill btn-primary inline-flex"
        >
          Open video
        </a>
      </div>
    );
  }

  return (
    <div className="product-video-frame aspect-square overflow-hidden rounded-[var(--radius)] border border-[color:var(--hairline)] bg-black">
      <video
        key={streamUrl}
        className="h-full w-full object-contain"
        controls
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={title}
        onError={() => setFailed(true)}
      >
        <source src={streamUrl} type="video/mp4" />
      </video>
    </div>
  );
}

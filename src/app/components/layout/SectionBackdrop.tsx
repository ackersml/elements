"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/app/components/home/motion/useReducedMotion";

type Tint = "white" | "cream" | "forest" | "sandstone";

type Props = {
  src: string;
  opacity?: number;
  position?: string;
  className?: string;
  vignetteBottom?: boolean;
  tint?: Tint;
  /** Subtle vertical parallax on scroll (±8%). */
  parallax?: boolean;
};

const tintOverlay: Record<Tint, string> = {
  white: "from-white/80 via-white/60 to-white/90",
  cream: "from-[#fff7f2]/88 via-[#fff7f2]/72 to-[#fff7f2]/92",
  forest: "from-[#2f3a2e]/82 via-[#2f3a2e]/55 to-[#2f3a2e]/78",
  sandstone: "from-[#e8decf]/85 via-[#e8decf]/65 to-[#e8decf]/88",
};

export function SectionBackdrop({
  src,
  opacity = 0.12,
  position = "center",
  className,
  vignetteBottom = false,
  tint = "white",
  parallax = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const imageLayer = (
    <Image
      src={src}
      alt=""
      fill
      sizes="100vw"
      style={{ opacity, objectPosition: position }}
      className="object-cover"
    />
  );

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {parallax && !reduced ? (
        <motion.div className="absolute inset-0 scale-110" style={{ y: imageY }}>
          {imageLayer}
        </motion.div>
      ) : (
        imageLayer
      )}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b",
          tintOverlay[tint]
        )}
      />
      {vignetteBottom ? (
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
      ) : null}
    </div>
  );
}

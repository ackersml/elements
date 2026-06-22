"use client";

import { Handshake, Headphones, RotateCcw, Truck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Marquee } from "@/components/ui/marquee";
import { MotionReveal, MotionStagger } from "./motion/motion-primitives";

const trustItems = [
  { key: "trustReturn", icon: RotateCcw, titleKey: "trustReturnTitle" },
  { key: "trustShipping", icon: Truck, titleKey: "trustShippingTitle" },
  { key: "trustTuning", icon: Handshake, titleKey: "trustTuningTitle" },
  { key: "trustSupport", icon: Headphones, titleKey: "trustSupportTitle" },
] as const;

export function TrustStrip() {
  const tm = useTranslations("mag");

  const marqueeItems = trustItems.map((item) => tm(item.titleKey));

  return (
    <>
      <div
        className="border-b border-border bg-[color:var(--surface-accent)] py-2.5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        aria-hidden
      >
        <MotionReveal y={8} delay={0}>
          <Marquee speed="slow" pauseOnHover className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {marqueeItems.map((label) => (
            <span key={label} className="mx-6 shrink-0">
              {label}
            </span>
          ))}
        </Marquee>
        </MotionReveal>
      </div>

      <section
        aria-label="Trust"
        className="border-y border-border section-band-accent section-padding"
      >
        <MotionStagger
          className="container-x grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          staggerDelay={0.12}
        >
          {trustItems.map(({ key, icon: Icon, titleKey }) => (
            <div
              key={key}
              className="flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              <Icon
                size={28}
                strokeWidth={1.25}
                className="text-[color:var(--sale-bg)]"
                aria-hidden
              />
              <p className="mt-4 font-display text-base text-foreground md:text-lg">
                {tm(titleKey)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                {tm(key)}
              </p>
            </div>
          ))}
        </MotionStagger>
      </section>
    </>
  );
}

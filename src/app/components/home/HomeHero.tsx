"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { MotionMagnetic, MotionSplitLines } from "./motion/motion-primitives";
import { useReducedMotion } from "./motion/useReducedMotion";

const EASE = [0.16, 1, 0.3, 1] as const;

type HomeHeroProps = {
  eyebrow: string;
  titleLine1: string;
  titleAccent: string;
  sub: string;
  kicker: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaLearn: string;
};

export function HomeHero({
  eyebrow,
  titleLine1,
  titleAccent,
  sub,
  kicker,
  ctaPrimary,
  ctaSecondary,
  ctaLearn,
}: HomeHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.35]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 48]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[78svh] items-center overflow-hidden md:min-h-[82vh]"
    >
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { scale: imageScale, y: imageY }}
      >
        <Image
          src="/images/handpan-lifestyle-13.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {!reduced ? (
        <div className="hero-shader-blend pointer-events-none absolute inset-0 opacity-[0.22]">
          <ShaderAnimation className="h-full w-full" />
        </div>
      ) : null}

      <div className="absolute inset-0 hero-fade elements-grain grain-animate" aria-hidden />

      <motion.div
        className="relative container-x pt-20 pb-12 md:pt-24 md:pb-16"
        style={reduced ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-4xl text-white">
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="eyebrow eyebrow-rule !text-white/70"
            >
              {eyebrow}
            </motion.p>

            <MotionSplitLines
              as="h1"
              lines={[titleLine1, titleAccent]}
              accentLineIndex={1}
              accentClassName="bronze-text"
              className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]"
              delay={0.18}
            />

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.38, ease: EASE }}
              className="mt-8 max-w-xl text-base text-white/85 md:text-lg"
            >
              {sub}
            </motion.p>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48, ease: EASE }}
              className="mt-3 max-w-lg text-sm italic text-white/60 md:text-base"
            >
              {kicker}
            </motion.p>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.58, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MotionMagnetic>
                <Link href="/shop" className="btn-pill btn-primary">
                  {ctaPrimary} <ArrowRight size={16} aria-hidden />
                </Link>
              </MotionMagnetic>
              <Link href="/collections/beginner" className="btn-pill btn-ghost-on-dark">
                {ctaSecondary}
              </Link>
            </motion.div>
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.68, ease: EASE }}
              className="mt-7 flex flex-wrap gap-x-8 gap-y-3"
            >
              <a
                href="#how-order"
                className="link-arrow !text-white hover:!border-[color:var(--bronze-accent)] hover:!text-[color:var(--bronze-accent)]"
              >
                {ctaLearn} <ArrowRight size={14} aria-hidden />
              </a>
            </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

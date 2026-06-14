"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./useReducedMotion";

const EASE = [0.16, 1, 0.3, 1] as const;

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  margin?: string;
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  margin = "-80px",
}: MotionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as `${number}px` });
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type MotionStaggerProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  childClassName?: string;
};

export function MotionStagger({
  children,
  className,
  staggerDelay = 0.1,
  childClassName,
}: MotionStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.7,
                delay: index * staggerDelay,
                ease: EASE,
              }}
              className={childClassName}
            >
              {child}
            </motion.div>
          ))
        : children}
    </div>
  );
}

type MotionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  titleId?: string;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  center?: boolean;
  delay?: number;
};

export function MotionHeading({
  eyebrow,
  title,
  titleId,
  className,
  eyebrowClassName,
  titleClassName,
  center = false,
  delay = 0,
}: MotionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reduced = useReducedMotion();
  const titleText = typeof title === "string" ? title : null;
  const words = titleText?.split(" ") ?? [];

  if (reduced) {
    return (
      <div className={cn(center && "text-center", className)}>
        {eyebrow ? <p className={eyebrowClassName}>{eyebrow}</p> : null}
        <h2 id={titleId} className={titleClassName}>{title}</h2>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn(center && "text-center", className)}>
      {eyebrow ? (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay, ease: EASE }}
          className={eyebrowClassName}
        >
          {eyebrow}
        </motion.p>
      ) : null}
      <h2 id={titleId} className={titleClassName}>
        {titleText ? (
          words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration: 0.6,
                delay: delay + (eyebrow ? 0.15 : 0) + index * 0.06,
                ease: EASE,
              }}
              className="mr-[0.25em] inline-block"
            >
              {word}
            </motion.span>
          ))
        ) : (
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.65, delay: delay + 0.1, ease: EASE }}
            className="inline-block"
          >
            {title}
          </motion.span>
        )}
      </h2>
    </div>
  );
}

type MotionClipImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function MotionClipImage({
  src,
  alt,
  className,
  sizes = "50vw",
  priority,
}: MotionClipImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  const reduced = useReducedMotion();
  const opacity = useTransform(scrollYProgress, [0, 0.65], [0, 1]);
  const clip = useTransform(
    scrollYProgress,
    [0, 0.65],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );
  const y = useTransform(scrollYProgress, [0, 1], [32, -12]);

  if (reduced) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority={priority} />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity, clipPath: clip, y }}
      className={cn("relative overflow-hidden", className)}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority={priority} />
    </motion.div>
  );
}

type MotionParallaxSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
};

export function MotionParallaxSection({
  children,
  className,
  id,
  "aria-labelledby": ariaLabelledby,
}: MotionParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const reduced = useReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  if (reduced) {
    return (
      <section id={id} aria-labelledby={ariaLabelledby} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      aria-labelledby={ariaLabelledby}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

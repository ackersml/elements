"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ProductPhoto } from "@/app/components/shop/ProductPhoto";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./useReducedMotion";

const EASE = [0.16, 1, 0.3, 1] as const;

export { EASE };

type MotionStaggerVariant = "default" | "tilt" | "border";

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
  variant?: MotionStaggerVariant;
};

export function MotionStagger({
  children,
  className,
  staggerDelay = 0.1,
  childClassName,
  variant = "default",
}: MotionStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  const childMotion = (index: number) => {
    switch (variant) {
      case "tilt":
        return {
          initial: { opacity: 0, y: 28, rotate: -1, filter: "blur(6px)" },
          animate: inView
            ? { opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 28, rotate: -1, filter: "blur(6px)" },
        };
      case "border":
        return {
          initial: { opacity: 0.4 },
          animate: inView ? { opacity: 1 } : { opacity: 0.4 },
        };
      default:
        return {
          initial: { opacity: 0, y: 24 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        };
    }
  };

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              {...childMotion(index)}
              transition={{
                duration: variant === "tilt" ? 0.8 : 0.7,
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

type MotionSplitLinesProps = {
  lines: string[];
  as?: "h1" | "h2" | "p";
  id?: string;
  className?: string;
  lineClassName?: string;
  accentLineIndex?: number;
  accentClassName?: string;
  delay?: number;
};

export function MotionSplitLines({
  lines,
  as: Tag = "h1",
  id,
  className,
  lineClassName,
  accentLineIndex,
  accentClassName,
  delay = 0,
}: MotionSplitLinesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {lines.map((line, i) => (
          <span
            key={line}
            className={cn(
              "block",
              i === accentLineIndex && accentClassName,
              lineClassName
            )}
          >
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <div ref={ref}>
      <Tag id={id} className={className}>
        {lines.map((line, lineIndex) => {
          const words = line.split(/\s+/).filter(Boolean);

          return (
            <span
              key={`${line}-${lineIndex}`}
              className={cn(
                "block overflow-hidden",
                lineIndex === accentLineIndex && accentClassName,
                lineClassName
              )}
            >
              {words.map((word, wordIndex) => (
                <Fragment key={`${lineIndex}-${wordIndex}`}>
                  <motion.span
                    initial={{ opacity: 0, y: "100%" }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: "100%" }}
                    transition={{
                      duration: 0.55,
                      delay: delay + lineIndex * 0.12 + wordIndex * 0.06,
                      ease: EASE,
                    }}
                    className="inline-block whitespace-nowrap"
                  >
                    {word}
                  </motion.span>
                  {wordIndex < words.length - 1 ? " " : null}
                </Fragment>
              ))}
            </span>
          );
        })}
      </Tag>
    </div>
  );
}

type MotionScaleRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function MotionScaleReveal({
  children,
  className,
  delay = 0,
}: MotionScaleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={
        inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 16 }
      }
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type MotionMagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function MotionMagnetic({
  children,
  className,
  strength = 12,
}: MotionMagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [finePointer, setFinePointer] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (reduced || !finePointer) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (el) el.style.transform = "";
      }}
      style={{ transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {children}
    </motion.div>
  );
}

type MotionHorizontalRailProps = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  childClassName?: string;
  staggerDelay?: number;
};

export function MotionHorizontalRail({
  children,
  className,
  trackClassName,
  childClassName,
  staggerDelay = 0.08,
}: MotionHorizontalRailProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={cn("product-rail", className)}>
        <div className={cn("product-rail-track", trackClassName)}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("product-rail motion-rail-fade-edges", className)}>
      <div className={cn("product-rail-track motion-rail-snap", trackClassName)}>
        {Array.isArray(children)
          ? children.map((child, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={
                  inView
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.96, y: 20 }
                }
                transition={{
                  duration: 0.7,
                  delay: index * staggerDelay,
                  ease: EASE,
                }}
                className={cn("product-rail-item", childClassName)}
              >
                {child}
              </motion.div>
            ))
          : children}
      </div>
    </div>
  );
}

type MotionBorderGrowProps = {
  children: ReactNode;
  className?: string;
};

/** Left border grows on scroll into view (assurance / buying guide). */
export function MotionBorderGrow({ children, className }: MotionBorderGrowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("relative pl-4", className)}>
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-0 top-0 w-0.5 origin-top bg-[color:var(--sale-bg)]"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.65, ease: EASE }}
      />
      {children}
    </div>
  );
}

type MotionIotmImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  active: boolean;
  className?: string;
};

/** Featured handpan entrance with bronze glow; transparent studio PNG. */
export function MotionIotmImage({
  src,
  alt,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  active,
  className,
}: MotionIotmImageProps) {
  const reduced = useReducedMotion();

  const photo = (
    <ProductPhoto
      src={src}
      alt={alt}
      aspect="square"
      variant="studio"
      frameClassName="aspect-square lg:aspect-[4/5]"
      sizes={sizes}
    />
  );

  if (reduced) {
    return (
      <div className={cn("iotm-image-wrap", className)}>
        <div className="iotm-glow" aria-hidden />
        {photo}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("iotm-image-wrap", className)}
      initial={{ opacity: 0, scale: 0.96, x: -20 }}
      animate={
        active ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.96, x: -20 }
      }
      transition={{ duration: 0.85, ease: EASE }}
    >
      <motion.div
        className="iotm-glow"
        aria-hidden
        initial={{ opacity: 0, scale: 0.85 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 1, delay: 0.08, ease: EASE }}
      />
      {photo}
    </motion.div>
  );
}

type MotionIotmStaggerProps = {
  children: ReactNode;
  active: boolean;
  delay?: number;
  className?: string;
};

export function MotionIotmStagger({
  children,
  active,
  delay = 0,
  className,
}: MotionIotmStaggerProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

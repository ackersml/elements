"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { product, formatPrice } from "@/lib/product";

export function LuxuryMinimalHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden bg-gradient-warm"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 md:mb-12"
          >
            <span className="inline-flex items-center gap-2 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
              <span className="w-8 h-px bg-primary" />
              Hand-tuned steel
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-8 md:mb-12 leading-[0.95] max-w-5xl"
          >
            Find the handpan
            <br />
            <span className="text-primary italic">that fits you</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mb-12 md:mb-16 leading-relaxed font-light"
          >
            Clear scale choices, insured shipping, and human support from first
            questions to unboxing. Built for players who want a calm buying
            path and transparent details before purchase.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <a
              href="#product"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-medium tracking-wide overflow-hidden transition-all duration-500 hover:brightness-110 glow-gold"
            >
              <span className="relative z-10 text-sm uppercase tracking-[0.15em]">
                Shop — {formatPrice(product.priceCents, product.currency)}
              </span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </a>

            <a
              href="#how-it-works"
              className="group inline-flex items-center gap-2 px-8 py-4 text-foreground font-medium tracking-wide border border-gold hover:border-primary transition-all duration-300 hover:bg-secondary"
            >
              <span className="text-sm uppercase tracking-[0.15em]">
                How ordering works
              </span>
              <span className="w-4 h-px bg-primary transition-all duration-300 group-hover:w-6" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="mt-24 md:mt-32 flex flex-wrap items-center gap-6 text-xs tracking-[0.2em] uppercase text-muted-foreground"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Insured delivery</span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>30-day return window</span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Tuning support</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-foreground/[0.03] rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}

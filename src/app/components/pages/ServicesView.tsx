"use client";

import { ArrowRight, HeartHandshake, Music, Users, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/app/components/layout/SiteHeader";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { SectionBackdrop } from "@/app/components/layout/SectionBackdrop";
import {
  MotionReveal,
  MotionStagger,
} from "@/app/components/home/motion/motion-primitives";
import { PageHero } from "./PageHero";

type Offering = {
  icon: LucideIcon;
  title: string;
  body: string;
  meta: string;
};

const offerings: Offering[] = [
  {
    icon: Music,
    title: "1:1 Sound Healing",
    body: "A private session built around your breath and nervous system: handpan, voice, and resonant percussion to settle you into deep rest.",
    meta: "60-90 min \u00B7 By appointment",
  },
  {
    icon: Users,
    title: "Group Sound Baths",
    body: "Lie back as layered handpan and overtone instruments move through the room. Small groups, soft floors, no experience needed.",
    meta: "75 min \u00B7 Up to 12 guests",
  },
  {
    icon: HeartHandshake,
    title: "Handpan Lessons",
    body: "From first contact to flowing improvisation. Posture, scale theory, and the muscle memory that turns notes into language.",
    meta: "Weekly \u00B7 Beginner to advanced",
  },
  {
    icon: Briefcase,
    title: "Corporate Wellness",
    body: "On-site sessions for teams that need to exhale. We bring the instruments, the calm, and a reset that lasts past the meeting.",
    meta: "Custom \u00B7 On location",
  },
];

const process = [
  {
    step: "01",
    title: "Arrive",
    body: "We talk through intention and anything your body is carrying, then settle the space and lighting.",
  },
  {
    step: "02",
    title: "Attune",
    body: "Breath leads first. Instruments enter gradually, matching your rhythm before slowing it.",
  },
  {
    step: "03",
    title: "Integrate",
    body: "Silence, water, and a few notes on how to carry the stillness into the rest of your week.",
  },
];

export function ServicesView() {
  return (
    <div className="relative bg-background text-foreground">
      <SiteHeader variant="overlay" />

      <PageHero
        eyebrow="Sound as a practice"
        title="Guided sessions for"
        titleAccent="calm, clarity & balance"
        sub="Beyond the instruments, Elements offers sound healing led in person, gently guiding you into a deeper state of presence."
        kicker={"Bali, Indonesia \u00B7 By appointment"}
        primaryCta={{ label: "Request a session", href: "/contact" }}
        secondaryCta={{ label: "Browse instruments", href: "/products" }}
        backgroundImage="/images/sound-healing-13.jpg"
        floatImage="/images/collection/handpan-earth.png"
        floatAlt="Elements handpan"
      />

      {/* Offerings grid */}
      <section className="section-band-dark section-padding md:py-36">
        <div className="container-x">
          <MotionReveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow !text-[color:var(--bronze-accent)]">Our offerings</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-white md:text-5xl">
              Ways to work with sound
            </h2>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[color:var(--bronze-accent)] to-transparent" />
            <p className="mt-6 text-[color:var(--sandstone)]/75">
              Our sound healing sessions use resonant tones and subtle frequencies
              to create a space of calm and balance. Designed for ease and
              stillness, each experience supports the body in releasing tension and
              returning to its natural rhythm.
            </p>
          </MotionReveal>

          <MotionStagger
            className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2"
            staggerDelay={0.12}
          >
            {offerings.map((o) => {
              const Icon = o.icon;
              return (
                <div
                  key={o.title}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:border-[color:var(--bronze-accent)]/45 md:p-10"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-lg border border-[color:var(--bronze-accent)]/25 bg-[color:var(--forest-moss)]/30 text-[color:var(--bronze-accent)] transition group-hover:bg-[color:var(--bronze-accent)]/10">
                    <Icon size={24} aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-white">{o.title}</h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-relaxed text-[color:var(--sandstone)]/75">
                    {o.body}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="smallcaps text-[color:var(--bronze-accent)]/80">
                      {o.meta}
                    </span>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-[color:var(--sandstone)] transition group-hover:gap-3 group-hover:text-[color:var(--bronze-accent)]"
                      aria-label={`Enquire about ${o.title}`}
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                  <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-gradient-to-r from-[color:var(--bronze-accent)] via-[color:var(--sandstone)] to-[color:var(--bronze-accent)] transition-all duration-700 group-hover:w-full" />
                </div>
              );
            })}
          </MotionStagger>
        </div>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden bg-white section-padding md:py-36">
        <SectionBackdrop src="/images/sound-healing-8.jpg" opacity={0.05} />
        <div className="relative container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow eyebrow-rule">How a session moves</p>
            <h2 className="mt-5 font-display text-3xl leading-tight md:text-5xl">
              A simple arc: arrive, attune, integrate
            </h2>
            <p className="mt-6 leading-relaxed text-foreground/80">
              No performance, no expectation. Every session is paced to your
              breath and ends with grounding before you step back out.
            </p>
          </div>
          <MotionStagger
            className="grid gap-8 sm:grid-cols-3 lg:col-span-7"
            staggerDelay={0.12}
          >
            {process.map((p) => (
              <div key={p.step} className="border-l-2 border-[color:var(--sale-bg)] pl-5">
                <p className="font-mono-label text-[color:var(--sale-bg)]">{p.step}</p>
                <h3 className="mt-3 font-display text-xl md:text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  {p.body}
                </p>
              </div>
            ))}
          </MotionStagger>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden bg-white section-padding md:py-44">
        <SectionBackdrop src="/images/sound-healing-2.jpg" opacity={0.08} />
        <MotionReveal className="relative container-x mx-auto max-w-2xl text-center">
          <p className="eyebrow eyebrow-rule !text-[color:var(--sale-bg)]">
            Reserve your time
          </p>
          <h2 className="mt-5 font-display text-3xl leading-tight md:text-5xl">
            Step into a quieter state
          </h2>
          <p className="mt-6 text-foreground/85">
            Sessions run from our Ubud studio and select locations. Tell us what
            you need and we&apos;ll find a window.
          </p>
          <div className="mt-9">
            <Link href="/contact" className="btn-pill btn-primary">
              Enquire now <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </MotionReveal>
      </section>

      <SiteFooter />
    </div>
  );
}

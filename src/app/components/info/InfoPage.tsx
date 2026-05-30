import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { SectionBackdrop } from "@/app/components/layout/SectionBackdrop";
import { SiteHeader } from "@/app/components/layout/SiteHeader";

type Props = {
  title: string;
  eyebrow?: string;
  /** Image used both as the hero banner background and the faded backdrop on the content section. */
  heroImage?: string;
  /** Object position for the hero image, e.g. "center", "center 30%". Default "center". */
  heroPosition?: string;
  children: ReactNode;
};

/**
 * Standard layout for all secondary pages (journal, contact, showrooms, shipping, returns, privacy).
 * Matches the homepage aesthetic: full-bleed hero with faded image, then a content section
 * with a subtle faded backdrop. Consistent across the entire site.
 */
export function InfoPage({
  title,
  eyebrow = "Elements",
  heroImage = "/images/handpan-lifestyle-2.jpg",
  heroPosition = "center",
  children,
}: Props) {
  return (
    <>
      {/* Hero banner */}
      <section className="relative flex min-h-[55vh] items-center overflow-hidden md:min-h-[60vh]">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: heroPosition }}
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(47,58,46,0.70) 0%, rgba(47,58,46,0.45) 40%, rgba(47,58,46,0.25) 80%, rgba(47,58,46,0.50) 100%), linear-gradient(180deg, rgba(47,58,46,0.25) 0%, rgba(47,58,46,0.05) 30%, rgba(47,58,46,0.90) 100%)",
          }}
          aria-hidden
        />
        <div className="grain" aria-hidden />
        <SiteHeader variant="overlay" />
        <div className="relative container-x pt-24 pb-12 md:pt-28 md:pb-16">
          <p className="eyebrow eyebrow-rule">{eyebrow}</p>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-[4rem]">
            {title}
          </h1>
        </div>
      </section>

      {/* Content section with subtle faded backdrop */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <SectionBackdrop src={heroImage} opacity={0.3} />
        <div className="relative container-x max-w-3xl">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition hover:text-[color:var(--accent-c)]"
          >
            ← Home
          </Link>
          <div className="mt-10 space-y-6 text-base leading-relaxed text-foreground/85 md:text-lg">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

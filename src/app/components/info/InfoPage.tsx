import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { SectionBackdrop } from "@/app/components/layout/SectionBackdrop";
import { SiteHeader } from "@/app/components/layout/SiteHeader";

type Props = {
  title: string;
  eyebrow?: string;
  heroImage?: string;
  heroPosition?: string;
  children: ReactNode;
};

export function InfoPage({
  title,
  eyebrow = "Elements",
  heroImage = "/images/handpan-lifestyle-2.jpg",
  heroPosition = "center",
  children,
}: Props) {
  return (
    <>
      <SiteHeader />
      <section className="relative flex min-h-[45vh] items-center overflow-hidden md:min-h-[50vh]">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: heroPosition }}
          className="object-cover"
        />
        <div className="absolute inset-0 hero-fade" aria-hidden />
        <div className="relative container-x pb-12 text-white md:pb-16">
          <p className="eyebrow eyebrow-rule !text-white/70">{eyebrow}</p>
          <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-[4rem]">
            {title}
          </h1>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white section-padding">
        <SectionBackdrop src={heroImage} opacity={0.05} />
        <div className="relative container-x max-w-3xl">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
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

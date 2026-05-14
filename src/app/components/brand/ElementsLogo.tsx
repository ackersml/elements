import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function ElementsLogomark({ size = 36 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/elements-logomark.svg"
      alt=""
      width={size}
      height={size}
      className="shrink-0 opacity-95"
    />
  );
}

type Props = {
  href?: string;
  className?: string;
  /** Smaller mark on mobile */
  compact?: boolean;
};

/**
 * Primary lockup: stylized logomark + “LEMENTS” in Cinzel (display), reads “ELEMENTS”.
 */
export function ElementsLogoLink({
  href = "/",
  className,
  compact = false,
}: Props) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5 outline-none", className)}
    >
      <ElementsLogomark size={compact ? 28 : 36} />
      <span className="font-display text-[0.95rem] font-semibold uppercase tracking-[0.32em] text-foreground md:text-[1.05rem]">
        lements
      </span>
      <span className="sr-only">Elements</span>
    </Link>
  );
}

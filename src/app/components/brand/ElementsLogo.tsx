import { Link } from "@/i18n/navigation";
import { brandLockup } from "@/lib/brand/elements-brand";
import { cn } from "@/lib/utils";

const wordmarkText =
  "font-display font-semibold uppercase tracking-[0.32em] text-foreground";

type Props = {
  href?: string;
  className?: string;
  compact?: boolean;
};

/**
 * Header lockup: Cinzel “E” + “LEMENTS” (no swirl image).
 */
export function ElementsLogoLink({
  href = "/",
  className,
  compact = false,
}: Props) {
  const size = compact
    ? "text-[0.95rem] md:text-[1.05rem]"
    : "text-xl md:text-[1.35rem]";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-baseline gap-0 outline-none transition-opacity hover:opacity-90",
        className
      )}
    >
      <span className={cn(wordmarkText, size)} aria-hidden>
        E
      </span>
      <span className={cn(wordmarkText, size)}>LEMENTS</span>
      <span className="sr-only">{brandLockup.wordmark}</span>
    </Link>
  );
}

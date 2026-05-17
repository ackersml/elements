import { Link } from "@/i18n/navigation";
import { brandLockup } from "@/lib/brand/elements-brand";
import { cn } from "@/lib/utils";
import { ElementsWordmark } from "./ElementsWordmark";

export function ElementsLogomark({ size = 36 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={brandLockup.logomarkSrc}
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
  compact?: boolean;
  /** hs-007 left card: Sound · Presence · Source under mark */
  showTagline?: boolean;
};

export function ElementsLogoLink({
  href = "/",
  className,
  showTagline = false,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex outline-none transition-opacity hover:opacity-90",
        className
      )}
    >
      <ElementsWordmark showTagline={showTagline} />
      <span className="sr-only">{brandLockup.wordmark}</span>
    </Link>
  );
}

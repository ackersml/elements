import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { brandLockup } from "@/lib/brand/elements-brand";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  className?: string;
  compact?: boolean;
};

export function ElementsLogoLink({
  href = "/",
  className,
  compact = false,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex shrink-0 items-center outline-none transition-opacity hover:opacity-90",
        className,
      )}
    >
      <Image
        src="/brand/elements-logo-header.png"
        alt={brandLockup.wordmark}
        width={8334}
        height={700}
        priority
        className={cn(
          "h-auto w-auto object-contain",
          compact ? "max-h-14 md:max-h-16" : "max-h-16 md:max-h-20",
        )}
        style={{ width: compact ? "min(70vw, 26rem)" : "min(75vw, 30rem)" }}
      />
    </Link>
  );
}

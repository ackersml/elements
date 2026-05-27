import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { brandLockup } from "@/lib/brand/elements-brand";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  className?: string;
  compact?: boolean;
  /** "light" renders sandstone-colored logo (for dark backgrounds), "dark" renders pine-grove-colored (for light backgrounds). */
  variant?: "light" | "dark";
};

const srcMap = {
  light: "/brand/elements-logo-light.png",
  dark: "/brand/elements-logo-dark.png",
} as const;

export function ElementsLogoLink({
  href = "/",
  className,
  compact = false,
  variant = "light",
}: Props) {
  const h = compact ? "h-6 md:h-7" : "h-8 md:h-9";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center outline-none transition-opacity hover:opacity-90",
        className,
      )}
    >
      <Image
        src={srcMap[variant]}
        alt={brandLockup.wordmark}
        width={480}
        height={120}
        priority
        className={cn("w-auto object-contain", h)}
      />
    </Link>
  );
}

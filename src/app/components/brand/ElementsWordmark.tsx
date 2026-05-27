import Image from "next/image";
import { brandTaglines } from "@/lib/brand/elements-brand";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  showTagline?: boolean;
  /** "light" renders sandstone-colored logo (for dark backgrounds), "dark" renders pine-grove-colored (for light backgrounds). */
  variant?: "light" | "dark";
};

const srcMap = {
  light: "/brand/elements-logo-light.png",
  dark: "/brand/elements-logo-dark.png",
} as const;

export function ElementsWordmark({
  className,
  showTagline = false,
  variant = "light",
}: Props) {
  return (
    <div className={cn("inline-flex flex-col gap-1.5", className)}>
      <Image
        src={srcMap[variant]}
        alt="Elements"
        width={480}
        height={120}
        className="h-8 w-auto object-contain md:h-9"
      />
      {showTagline ? (
        <p className="text-[9px] uppercase tracking-[0.32em] text-muted-foreground md:text-[10px]">
          {brandTaglines.primary}
        </p>
      ) : null}
    </div>
  );
}

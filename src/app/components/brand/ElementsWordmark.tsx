import { brandLockup, brandTaglines } from "@/lib/brand/elements-brand";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  showTagline?: boolean;
};

/**
 * Header wordmark matching PDF hs-007 / hs-000: stylized E + Cinzel LEMENTS.
 * Inline SVG so `currentColor` follows site foreground.
 */
export function ElementsWordmark({ className, showTagline = false }: Props) {
  return (
    <div className={cn("inline-flex flex-col gap-1.5", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 48"
        fill="none"
        className="h-8 w-auto md:h-9"
        aria-hidden
      >
        <g transform="translate(0 1) scale(0.42)" stroke="currentColor" fill="none">
          <circle cx="50" cy="50" r="47" strokeWidth="1.25" opacity="0.85" />
          <path
            strokeWidth="3.5"
            strokeLinecap="round"
            d="M50 12 C28 12 12 30 12 50 C12 62 18 72 28 78"
          />
          <path
            strokeWidth="3.5"
            strokeLinecap="round"
            d="M50 12 C72 12 88 30 88 50 C88 62 82 72 72 78"
          />
          <path
            strokeWidth="3.5"
            strokeLinecap="round"
            d="M28 78 C36 84 43 88 50 88 C57 88 64 84 72 78"
          />
          <path
            strokeWidth="2.8"
            strokeLinejoin="round"
            d="M50 22 C40 22 32 30 32 40 C32 48 38 54 50 58 C62 54 68 48 68 40 C68 30 60 22 50 22 Z"
          />
        </g>
        <text
          x="48"
          y="33"
          className="fill-current font-display text-[23px] font-medium tracking-[0.12em] md:text-[25px]"
        >
          LEMENTS
        </text>
      </svg>
      {showTagline ? (
        <p className="text-[9px] uppercase tracking-[0.32em] text-muted-foreground md:text-[10px]">
          {brandTaglines.primary}
        </p>
      ) : null}
    </div>
  );
}

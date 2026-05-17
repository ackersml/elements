import {
  formatElementKeywords,
  formatElementLabel,
  type BrandElementId,
} from "@/lib/brand/elements-brand";

export function ProductElementLine({
  element,
  showKeywords = false,
  className,
}: {
  element: BrandElementId;
  showKeywords?: boolean;
  className?: string;
}) {
  return (
    <p className={className ?? "smallcaps text-muted-foreground"}>
      {formatElementLabel(element)}
      {showKeywords ? (
        <span className="mt-1 block font-body normal-case tracking-normal text-xs text-muted-foreground/90">
          {formatElementKeywords(element)}
        </span>
      ) : null}
    </p>
  );
}

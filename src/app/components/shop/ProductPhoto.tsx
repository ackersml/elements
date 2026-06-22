import Image from "next/image";
import { PHOTO_ASSET_VERSION, productPhotoPath } from "@/lib/product-photos";
import { cn } from "@/lib/utils";

type ProductPhotoProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  frameClassName?: string;
  aspect?: "square" | "4/3" | "video" | "21/9" | "3/4" | "4/5";
  /** Tighter padding for category tiles; avoids clipping on hover. */
  variant?: "default" | "tile" | "commerce" | "scene" | "studio";
};

const aspectClass: Record<NonNullable<ProductPhotoProps["aspect"]>, string> = {
  square: "aspect-square",
  "4/3": "aspect-[4/3]",
  video: "aspect-video",
  "21/9": "aspect-[21/9]",
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
};

export function ProductPhoto({
  src,
  alt,
  priority,
  sizes = "33vw",
  className,
  frameClassName,
  aspect = "square",
  variant = "default",
}: ProductPhotoProps) {
  const imageSrc = productPhotoPath(src);

  return (
    <div
      className={cn(
        "product-photo-frame",
        aspectClass[aspect],
        variant === "studio" && "product-photo-frame--studio",
        frameClassName
      )}
    >
      <Image
        key={`${imageSrc}-${PHOTO_ASSET_VERSION}`}
        src={imageSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(
          "product-photo",
          variant === "tile" && "product-photo--tile",
          variant === "commerce" && "product-photo--commerce",
          variant === "scene" && "product-photo--scene",
          variant === "studio" && "product-photo--studio",
          className
        )}
      />
    </div>
  );
}

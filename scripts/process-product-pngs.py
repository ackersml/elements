#!/usr/bin/env python3
"""Generate transparent PNG product cutouts from studio JPGs using rembg."""

from __future__ import annotations

from io import BytesIO
from pathlib import Path

from PIL import Image
from rembg import remove

PRODUCTS_DIR = Path(__file__).resolve().parents[1] / "public" / "products"


def process(src: Path) -> Image.Image:
    raw = src.read_bytes()
    cutout = remove(raw)
    img = Image.open(BytesIO(cutout)).convert("RGBA")
    return img


def main() -> None:
    for src in sorted(PRODUCTS_DIR.glob("*.jpg")):
        out = src.with_suffix(".png")
        process(src).save(out, optimize=True)
        print(f"Wrote {out.relative_to(PRODUCTS_DIR.parent.parent)}")


if __name__ == "__main__":
    main()

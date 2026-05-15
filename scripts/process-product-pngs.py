#!/usr/bin/env python3
"""Regenerate product PNGs: transparent background via edge flood-fill only."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

PRODUCTS_DIR = Path(__file__).resolve().parents[1] / "public" / "products"
WHITE_THRESHOLD = 248


def is_background_pixel(r: int, g: int, b: int, thresh: int = WHITE_THRESHOLD) -> bool:
    return r >= thresh and g >= thresh and b >= thresh


def flood_transparent(img: Image.Image, thresh: int = WHITE_THRESHOLD) -> Image.Image:
    img = img.convert("RGBA")
    w, h = img.size
    pixels = img.load()
    visited = [[False] * w for _ in range(h)]
    queue: deque[tuple[int, int]] = deque()

    def seed(x: int, y: int) -> None:
        if 0 <= x < w and 0 <= y < h and not visited[y][x]:
            r, g, b, _ = pixels[x, y]
            if is_background_pixel(r, g, b, thresh):
                visited[y][x] = True
                queue.append((x, y))

    for x in range(w):
        seed(x, 0)
        seed(x, h - 1)
    for y in range(h):
        seed(0, y)
        seed(w - 1, y)

    while queue:
        x, y = queue.popleft()
        r, g, b, _ = pixels[x, y]
        pixels[x, y] = (r, g, b, 0)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                r2, g2, b2, _ = pixels[nx, ny]
                if is_background_pixel(r2, g2, b2, thresh):
                    visited[ny][nx] = True
                    queue.append((nx, ny))

    return img


def main() -> None:
    for src in sorted(PRODUCTS_DIR.glob("*.jpg")):
        out = src.with_suffix(".png")
        flood_transparent(Image.open(src)).save(out, optimize=True)
        print(f"Wrote {out.relative_to(PRODUCTS_DIR.parent.parent)}")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Regenerate product PNGs: edge white flood + neutral gray/white flood only."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

PRODUCTS_DIR = Path(__file__).resolve().parents[1] / "public" / "products"
WHITE_EDGE = 245
MIN_NEUTRAL = 140
MAX_CHROMA = 38


def is_white_edge(r: int, g: int, b: int) -> bool:
    return r >= WHITE_EDGE and g >= WHITE_EDGE and b >= WHITE_EDGE


def is_neutral_light(r: int, g: int, b: int) -> bool:
    avg = (r + g + b) / 3
    if avg < MIN_NEUTRAL:
        return False
    return max(r, g, b) - min(r, g, b) <= MAX_CHROMA


def edge_flood(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    w, h = img.size
    pixels = img.load()
    visited = [[False] * w for _ in range(h)]
    queue: deque[tuple[int, int]] = deque()

    def seed(x: int, y: int) -> None:
        if 0 <= x < w and 0 <= y < h and not visited[y][x]:
            r, g, b, _ = pixels[x, y]
            if is_white_edge(r, g, b):
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
                if is_white_edge(r2, g2, b2):
                    visited[ny][nx] = True
                    queue.append((nx, ny))
    return img


def neutral_flood(img: Image.Image) -> Image.Image:
    w, h = img.size
    pixels = img.load()
    visited = [[False] * w for _ in range(h)]
    queue: deque[tuple[int, int]] = deque()
    for y in range(h):
        for x in range(w):
            if pixels[x, y][3] == 0:
                visited[y][x] = True
                queue.append((x, y))
    while queue:
        x, y = queue.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                r, g, b, a = pixels[nx, ny]
                if a == 0:
                    visited[ny][nx] = True
                    queue.append((nx, ny))
                    continue
                if is_neutral_light(r, g, b):
                    visited[ny][nx] = True
                    pixels[nx, ny] = (r, g, b, 0)
                    queue.append((nx, ny))
    return img


def process(src: Path) -> Image.Image:
    return neutral_flood(edge_flood(Image.open(src)))


def main() -> None:
    for src in sorted(PRODUCTS_DIR.glob("*.jpg")):
        out = src.with_suffix(".png")
        process(src).save(out, optimize=True)
        print(f"Wrote {out.relative_to(PRODUCTS_DIR.parent.parent)}")


if __name__ == "__main__":
    main()

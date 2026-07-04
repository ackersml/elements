#!/usr/bin/env python3
"""Process design-drop/ originals into optimized webp installed at the right paths.

Usage: python3 scripts/process-design-drop.py
Drop files named per design-drop/README.md (any image extension). Skips names with no file.
"""
import glob
import os
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DROP = os.path.join(ROOT, "design-drop")
CANVA = os.path.join(ROOT, "public", "images", "canva")

MAX_EDGE = 3840
QUALITY = 90

# drop name -> target path (relative to public/images/canva)
MAP = {
    "hero": "hero-bali.webp",
    "featured": "featured-d-kurd-lifestyle.webp",
    "space": "elements/space.webp",
    "fire": "elements/fire.webp",
    "water": "elements/water.webp",
    "earth": "elements/earth.webp",
    "air": "elements/air.webp",
    "center-handpan": "elements/center-handpan.webp",
    "series-elements": "series/elements-card.webp",
    "series-origins": "series/origins-card.webp",
    "series-accessory": "series/accessory-card.webp",
    "series-shop-all": "series/shop-all-card.webp",
    "explore-elements": "explore/elements-explore.webp",
    "explore-origins": "explore/origins-explore.webp",
}


def find_drop(name):
    hits = [
        f for f in glob.glob(os.path.join(DROP, name + ".*"))
        if not f.lower().endswith((".md", ".txt"))
    ]
    return hits[0] if hits else None


def process(src, target_rel):
    im = Image.open(src)
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")
    w, h = im.size
    scale = min(1.0, MAX_EDGE / max(w, h))
    if scale < 1.0:
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    dst = os.path.join(CANVA, target_rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    im.save(dst, "WEBP", quality=QUALITY, method=6)
    return im.size, os.path.getsize(dst)


def main():
    done, skipped = [], []
    for name, target in MAP.items():
        src = find_drop(name)
        if not src:
            skipped.append(name)
            continue
        size, bytes_ = process(src, target)
        done.append(f"  {name:18s} -> {target:34s} {size[0]}x{size[1]}  {bytes_//1024} KB  (from {os.path.basename(src)})")
    print("INSTALLED:")
    print("\n".join(done) if done else "  (none)")
    print(f"\nSKIPPED (no file dropped): {', '.join(skipped) if skipped else 'none'}")


if __name__ == "__main__":
    main()

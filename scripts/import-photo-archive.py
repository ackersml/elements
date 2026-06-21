#!/usr/bin/env python3
"""Import studio PNGs: edge-connected black removal, view ordering (top, side, ...)."""

from __future__ import annotations

import json
from collections import deque
from collections.abc import Callable
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PHOTO_DIR = "\u7167\u7247"
GREY_BAG = "\u7070\u5305"
BLACK_BAG = "\u9ed1\u5305"
SRC = ROOT / ".tmp-photo-import" / PHOTO_DIR
OUT = ROOT / "public" / "products"

# One folder per catalog handpan. Folder 1 = F# Nordlys 15, folder 9 = D Kurd 16
# Ultimate, folder 10 = the single D Kurd 10 listing. Folder 8 unused.
FOLDER_SLUGS: dict[str, str] = {
    "1": "nordlys-f-sharp-15",
    "2": "trailhead-d-celtic-9",
    "3": "sanctuary-b-amara-9",
    "4": "copper-veil-d-kurd-12",
    "5": "sanctuary-c-minor-15",
    "6": "atelier-c-sharp-pygmy-17",
    "7": "atelier-f-sharp-pygmy-17",
    "9": "ultimate-d-kurd-16",
    "10": "studio-handpan-d-kurd-10",
    GREY_BAG: "road-case-carbon-weave",
    BLACK_BAG: "handpan-bag-black",
}

# Verified studio shot order per folder: top, side, then remaining views.
FOLDER_FILE_ORDER: dict[str, list[str]] = {
    "1": ["DSC01299.png", "DSC01297.png", "DSC01300.png", "DSC01301.png"],
    "2": ["DSC01314.png", "DSC01319.png", "DSC01312.png"],
    "3": ["DSC01324.png", "DSC01323.png", "DSC01322.png"],
    "4": ["DSC01365.png", "DSC01366.png", "DSC01367.png"],
    "5": ["DSC01371.png", "DSC01372.png", "DSC01374.png"],
    "6": ["DSC01377.png", "DSC01384.png", "DSC01408.png"],
    "7": [
        "DSC01424.png",
        "DSC01423.png",
        "DSC01430.png",
        "DSC01446.png",
        "DSC01442.png",
    ],
}

VIEW_ORDER = {"top": 0, "side": 1, "bottom": 2, "other": 3}
MAX_EDGE = 1600
MATTE_EDGE = 2400
CLASSIFY_EDGE = 800
BLACK_THRESHOLD = 42
BLACK_FLOOD = 14
WHITE_FLOOD = 248
SUBJECT_LUM = 16
SOURCE_ALPHA_MIN = 8
ALPHA_DILATE = 6
SIDE_ASPECT = 1.35
BOTTOM_LUM = 105
MAX_IMAGES_PER_PRODUCT = 5


def is_near_black(r: int, g: int, b: int, threshold: int = BLACK_FLOOD) -> bool:
    return r <= threshold and g <= threshold and b <= threshold


def is_near_white(r: int, g: int, b: int, threshold: int = WHITE_FLOOD) -> bool:
    return r >= threshold and g >= threshold and b >= threshold


def flood_from_edges(
    w: int,
    h: int,
    is_bg: Callable[[int, int], bool],
) -> set[tuple[int, int]]:
    """Return pixels connected to image borders that match is_bg."""
    seen: set[tuple[int, int]] = set()
    q: deque[tuple[int, int]] = deque()

    def seed(x: int, y: int) -> None:
        if (x, y) in seen:
            return
        if is_bg(x, y):
            seen.add((x, y))
            q.append((x, y))

    for x in range(w):
        seed(x, 0)
        seed(x, h - 1)
    for y in range(h):
        seed(0, y)
        seed(w - 1, y)

    while q:
        x, y = q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen and is_bg(nx, ny):
                seen.add((nx, ny))
                q.append((nx, ny))

    return seen


def unpremultiply_rgb(r: int, g: int, b: int, a: int) -> tuple[int, int, int]:
    """Recover edge color before snapping alpha to opaque."""
    if a <= 0:
        return 0, 0, 0
    if a >= 255:
        return r, g, b
    factor = 255.0 / a
    return (
        min(255, int(r * factor)),
        min(255, int(g * factor)),
        min(255, int(b * factor)),
    )


def remove_studio_background(img: Image.Image) -> Image.Image:
    """Matte studio shots: flood white/black from edges, rebuild alpha, dilate rim."""
    rgba = img.convert("RGBA")
    w, h = rgba.size
    px = rgba.load()

    def rgb_at(x: int, y: int) -> tuple[int, int, int]:
        return px[x, y][:3]

    bg: set[tuple[int, int]] = set()
    bg |= flood_from_edges(w, h, lambda x, y: is_near_white(*rgb_at(x, y)))
    bg |= flood_from_edges(w, h, lambda x, y: is_near_black(*rgb_at(x, y)))

    subject = bytearray(w * h)
    for y in range(h):
        for x in range(w):
            if (x, y) in bg:
                continue
            r, g, b, a = px[x, y]
            if (
                max(r, g, b) >= SUBJECT_LUM
                or a >= 64
                or (a >= SOURCE_ALPHA_MIN and (x, y) not in bg)
            ):
                subject[y * w + x] = 1

    for _ in range(ALPHA_DILATE):
        grown = bytearray(subject)
        for y in range(h):
            for x in range(w):
                if not subject[y * w + x]:
                    continue
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in bg:
                        grown[ny * w + nx] = 1
        subject = grown

    for y in range(h):
        for x in range(w):
            i = y * w + x
            if subject[i]:
                r, g, b, a = px[x, y]
                r, g, b = unpremultiply_rgb(r, g, b, a)
                px[x, y] = (r, g, b, 255)
            else:
                px[x, y] = (0, 0, 0, 0)

    return rgba


def remove_black_background(img: Image.Image) -> Image.Image:
    """Back-compat alias."""
    return remove_studio_background(img)


def prepare_for_classify(img: Image.Image) -> Image.Image:
    """Downsample and matting for view detection."""
    w, h = img.size
    edge = max(w, h)
    if edge > CLASSIFY_EDGE:
        scale = CLASSIFY_EDGE / edge
        img = img.resize((int(w * scale), int(h * scale)), Image.Resampling.BILINEAR)
    return remove_black_background(img)


def classify_view_rgba(rgba: Image.Image) -> str:
    """Classify using alpha bbox after edge-connected matting."""
    px = rgba.load()
    w, h = rgba.size
    min_x, min_y, max_x, max_y = w, h, 0, 0
    subject = 0
    for y in range(h):
        for x in range(w):
            if px[x, y][3] > 32:
                subject += 1
                min_x = min(min_x, x)
                max_x = max(max_x, x)
                min_y = min(min_y, y)
                max_y = max(max_y, y)

    if subject < 500:
        return "other"

    bw = max_x - min_x + 1
    bh = max_y - min_y + 1
    aspect = bw / bh if bh else 1.0

    if aspect > SIDE_ASPECT:
        return "side"

    cx = (min_x + max_x) // 2
    cy = (min_y + max_y) // 2
    radius = max(8, min(bw, bh) // 6)
    lum_sum = 0.0
    lum_count = 0
    for y in range(cy - radius, cy + radius):
        for x in range(cx - radius, cx + radius):
            if 0 <= x < w and 0 <= y < h and px[x, y][3] > 64:
                r, g, b = px[x, y][:3]
                lum_sum += 0.299 * r + 0.587 * g + 0.114 * b
                lum_count += 1

    if lum_count and (lum_sum / lum_count) > BOTTOM_LUM:
        return "bottom"
    return "top"


def classify_file(path: Path) -> str:
    with Image.open(path) as img:
        return classify_view_rgba(prepare_for_classify(img))


def sort_files_by_view(files: list[Path], folder_name: str) -> list[Path]:
    """Order: hero top, hover side, then remaining views."""
    if folder_name in FOLDER_FILE_ORDER:
        by_name = {f.name: f for f in files}
        ordered: list[Path] = []
        for name in FOLDER_FILE_ORDER[folder_name]:
            if name in by_name:
                ordered.append(by_name[name])
        return ordered

    buckets: dict[str, list[Path]] = {k: [] for k in VIEW_ORDER}
    for f in files:
        view = classify_file(f)
        buckets[view if view in buckets else "other"].append(f)

    tops = sorted(buckets["top"])
    sides = sorted(buckets["side"])
    bottoms = sorted(buckets["bottom"])
    others = sorted(buckets["other"])

    ordered: list[Path] = []
    if tops:
        ordered.append(tops[0])
    if sides:
        ordered.append(sides[0])
    ordered.extend(tops[1:])
    ordered.extend(sides[1:])
    ordered.extend(bottoms)
    ordered.extend(others)
    return ordered


def clear_slug_outputs(slug: str) -> None:
    for old in OUT.glob(f"{slug}-*.png"):
        old.unlink()


def binarize_alpha(img: Image.Image, threshold: int = 96) -> Image.Image:
    """Snap alpha to 0/255 so resize does not leave halos."""
    rgba = img.convert("RGBA")
    px = rgba.load()
    w, h = rgba.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a >= threshold:
                px[x, y] = (r, g, b, 255)
            else:
                px[x, y] = (0, 0, 0, 0)
    return rgba


def resize_for_matte(img: Image.Image) -> Image.Image:
    w, h = img.size
    edge = max(w, h)
    if edge <= MATTE_EDGE:
        return img
    scale = MATTE_EDGE / edge
    return img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)


def resize_if_needed(img: Image.Image) -> Image.Image:
    w, h = img.size
    edge = max(w, h)
    if edge <= MAX_EDGE:
        return binarize_alpha(img)
    scale = MAX_EDGE / edge
    new_w, new_h = int(w * scale), int(h * scale)
    r, g, b, a = img.split()
    rgb = Image.merge("RGB", (r, g, b)).resize(
        (new_w, new_h), Image.Resampling.LANCZOS
    )
    alpha = a.resize((new_w, new_h), Image.Resampling.NEAREST)
    merged = Image.merge("RGBA", (*rgb.split(), alpha))
    return binarize_alpha(merged)


def process_file(src: Path, dest: Path) -> None:
    img = resize_for_matte(Image.open(src))
    img = binarize_alpha(remove_studio_background(img))
    img = resize_if_needed(img)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, format="PNG", optimize=True)


def edge_audit(path: Path) -> tuple[int, int, int]:
    """Return (left_hard, right_hard, semi) opaque edge counts on bbox columns."""
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    px = img.load()
    min_x, min_y, max_x, max_y = w, h, 0, 0
    for y in range(h):
        for x in range(w):
            if px[x, y][3] > 32:
                min_x = min(min_x, x)
                max_x = max(max_x, x)
                min_y = min(min_y, y)
                max_y = max(max_y, y)

    def hard_count(x_line: int) -> int:
        return sum(1 for y in range(min_y, max_y + 1) if px[x_line, y][3] >= 230)

    left = hard_count(min_x)
    right = hard_count(max_x)
    semi = sum(
        1
        for y in range(min_y, max_y + 1)
        for x in (min_x, max_x)
        if 32 < px[x, y][3] < 230
    )
    return left, right, semi


def write_product_photos_ts(manifest: dict[str, list[str]]) -> None:
    from datetime import datetime, timezone

    version = datetime.now(timezone.utc).strftime("%Y%m%d")
    lines = [
        "/** Studio imports from scripts/import-photo-archive.py */",
        f'export const PHOTO_ASSET_VERSION = "{version}";',
        "",
        "export const productPhotoSets = {",
    ]
    for slug, paths in manifest.items():
        lines.append(f'  "{slug}": [')
        for path in paths:
            lines.append(f'    "{path}",')
        lines.append("  ],")
    lines.extend(
        [
            "} as const;",
            "",
            "export type ProductPhotoSlug = keyof typeof productPhotoSets;",
            "",
            "export function isProductPhotoSlug(slug: string): slug is ProductPhotoSlug {",
            "  return slug in productPhotoSets;",
            "}",
            "",
            "export function productPhotoPath(src: string): string {",
            '  return src.split("?")[0] ?? src;',
            "}",
            "",
            "export function photosFor(slug: ProductPhotoSlug): readonly string[] {",
            "  return productPhotoSets[slug];",
            "}",
            "",
            "export function heroFor(slug: ProductPhotoSlug): string {",
            "  return productPhotoSets[slug][0];",
            "}",
            "",
            "/** Primary (top) and hover (side) for product cards. */",
            "export function cardPhotosFor(slug: ProductPhotoSlug): {",
            "  primary: string;",
            "  hover: string;",
            "} {",
            "  const photos = productPhotoSets[slug];",
            "  return {",
            "    primary: photos[0],",
            "    hover: photos[1] ?? photos[0],",
            "  };",
            "}",
            "",
        ]
    )
    out = ROOT / "src" / "lib" / "product-photos.ts"
    out.write_text("\n".join(lines), encoding="utf-8")


def main() -> None:
    manifest: dict[str, list[str]] = {}
    cleared: set[str] = set()

    for folder_name, slug in FOLDER_SLUGS.items():
        folder = SRC / folder_name
        if not folder.is_dir():
            print(f"skip missing folder {folder_name!r}")
            continue

        # Multiple folders may feed one slug: clear outputs once, then append.
        if slug not in cleared:
            clear_slug_outputs(slug)
            cleared.add(slug)

        files = sort_files_by_view(sorted(folder.glob("*.png")), folder_name)
        existing = len(manifest.get(slug, []))
        if slug not in ("road-case-carbon-weave", "handpan-bag-black"):
            files = files[: max(0, MAX_IMAGES_PER_PRODUCT - existing)]

        for offset, src in enumerate(files):
            idx = existing + offset + 1
            dest_name = f"{slug}-{idx:02d}.png"
            dest = OUT / dest_name
            view = classify_file(src)
            process_file(src, dest)
            manifest.setdefault(slug, []).append(f"/products/{dest_name}")
            print(f"{folder_name}/{src.name} ({view}) -> {dest_name}")

    manifest_path = ROOT / "scripts" / "imported-product-photos.json"
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    write_product_photos_ts(manifest)
    print(f"\nWrote {manifest_path.relative_to(ROOT)}")
    print(f"Wrote src/lib/product-photos.ts")

    print("\nEdge audit (left_hard, right_hard, semi on bbox):")
    for path in sorted(OUT.glob("*.png")):
        left, right, semi = edge_audit(path)
        flag = " !" if right < left // 2 or semi > 40 else ""
        print(f"  {path.name}: L={left} R={right} semi={semi}{flag}")


if __name__ == "__main__":
    main()

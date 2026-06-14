# Yatao UX audit ? Elements homepage map

Reference: [yataoshop.com](https://yataoshop.com) (Shopify). Elements on Next.js uses the **Yatao storefront theme** with **Elements brand identity**.

## Aesthetic decision

**Elements brand identity** (Cinzel wordmark, forest `#2F3A2E`, bronze `#D4B98A`, five elements) on a **full Yatao light commerce theme**: white/cream surfaces, terracotta sale accents, Open Sans body, black uppercase CTAs, 1440px layout, icon trust strip, image mega-menu, white product cards.

## Section map (Yatao ? Elements)

| # | Yatao block | Elements `ElementsHomeView` | Notes |
|---|-------------|----------------------------|-------|
| 1 | Hero + dual CTA | Hero (`section` overlay header) | Same pattern |
| 2 | 4-column trust icons | `TrustStrip` | Moved directly under hero |
| 3 | Promo / shipping band | Info strip | Elements-specific; after trust |
| 4 | Handpan of the month | Instrument of the month | Limited-stock pill added |
| 5 | Beginner handpans grid | Beginner collection + `ProductCard` | Quick Buy, badges, From pricing |
| 6 | Customer reviews (4.94?) | `CustomerReviews` | Static aggregate + quotes |
| 7 | Highlights & rarities | Rarities | Wide cards |
| 8 | Bundle offers | Bundle offers | Unchanged structure |
| 9 | Cases & bags | Cases & bags | Swatches + grid |
| 10 | Category exploration | Category tiles | Lower on page; nav mega-menu covers shop entry |
| 11 | Curated picks | Find your sound | After categories |
| 12 | Brand values | Why choose Elements | Elements-specific |
| 13 | Warranty / care | Warranty CTA | Unchanged |
| 14 | Newsletter | Journal dispatch | Unchanged |
| 15 | Buying guide | `#how-order` | Unchanged |
| 16 | Showrooms / Learn | Showrooms | Unchanged |
| 17 | Footer | `HomePageFooter` | Unchanged |

## Header

| Yatao | Elements |
|-------|----------|
| Shop mega-menu with category thumbnails | `SiteHeader` image mega-menu via `shopNavCollections` |
| Blog / Learn | Journal |
| Showrooms | Showrooms |

## Product card parity

| Yatao | Elements `ProductCard` |
|-------|------------------------|
| White product image area | `variant="commerce"` on `ProductPhoto` |
| Sale / Sold out badges | `compareAtPriceCents`, `stockStatus` |
| Image dot carousel | Multi-image dots when `images.length > 1` |
| Quick Buy + price | `QuickBuyButton` + From line |
| Card density ~16px gutter, 3-up grid | `gap-6` grid, `py-28` sections |

## Commerce polish (Phase 3)

| Yatao | Elements |
|-------|----------|
| Quick Buy adds to cart | `QuickBuyButton` ? `cart.add()` + opens drawer |
| Cart drawer line items | `CartDrawer` � white-bg thumbnails, scale subtitle |

## Visily handoff

See `/homepage-outline` � section order and layout strings updated with Yatao spacing refs (`py-28`, 3-col product grid, trust immediately post-hero).

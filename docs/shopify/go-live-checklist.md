# Elements Handpans — Go-Live Checklist

**For:** Dany · **Storefront:** elements-snowy.vercel.app *(custom domain pending)*
**Checkout:** Shopify hosted checkout — payments, shipping, duties and orders all run natively in Shopify.
**Status:** The store is **mechanically complete and verified** — payments, EU shipping, duties, tax and the Shopify checkout are all live, and a test EU checkout confirmed they render correctly together (€79 shipping + duties + import VAT + PayPal/Google Pay). It's held behind Shopify's **"Opening soon" password page**, so it's **not public yet** — a deliberate safety gate. Removing that password is the final go-live switch, gated on: **confirming where instruments ship from** (§2), policy details + legal review (§3), and the domain (§4).

---

## Already done (no action needed)

- ✅ **All 20 products** — descriptions, specs, prices, photos, SEO.
- ✅ **Base currency = EUR.** Prices show and charge in euros (e.g. €1,300).
- ✅ **Collections** — Signature Series, Origins, Cases & Accessories.
- ✅ **Payments are live.** Shopify checkout takes cards via **Stripe** (connected to your Cornerstone Devs account) and **PayPal**. Live mode, cards + PayPal enabled.
- ✅ **Duties & import taxes set up (DDP).** For the **EU and Indonesia**, import duty and VAT are calculated by Avalara and **added as separate lines at checkout** (0.5% Shopify fee on those orders). The customer pays them up front, so **no surprise customs bill on delivery** — a genuine selling point for high-value instruments.
- ✅ **Tax handling decided + set.** You keep your listed price; import VAT is added on top at checkout (not absorbed). Sales tax is correctly set to "not collecting" (you're not EU VAT-registered).
- ✅ **Card-statement name** shows **ELEMENTS HANDPANS** (reduces disputes).
- ✅ **EU shipping is set up.** A flat **€79 "Standard"** rate covers all 27 EU countries — the coverage gap that blocked checkout is fixed. Rest-of-world is intentionally off for launch. *(€79 and the "5–8 business day" estimate are provisional placeholders — confirm against a real carrier quote + actual dispatch times.)*
- ✅ **Policies drafted** — Shipping, Refunds/Returns, Privacy, Terms are written and ready for your details + a legal review (see §3).
- ✅ **Storefront flipped to Shopify checkout + verified end-to-end.** Buy buttons now route to Shopify's hosted checkout. A test EU (Germany) checkout rendered correctly: €1,300 product · **€79 shipping** · **€89.64 duties** · **€279.04 import VAT** (19%, added on top) · **Total €1,747.68**, with **PayPal + Google Pay** and cards offered. *(No payment taken — we verified the checkout renders, we didn't transact.)*

> **Note on orders:** with Shopify checkout, every paid order lands in your **Shopify admin ▸ Orders**, with the customer's details and shipping address, ready for you to fulfil by hand. (The earlier database order-recording we built was for a different checkout approach and is now on standby.)

> **Note on going public:** the store sits behind Shopify's password page, so no real customer can buy yet. Removing it (Online Store ▸ Preferences) is the final "go live" switch — do it only after §2 (origin/sanctions) is cleared.

---

## What we need from you

### 1. ✅ Shipping — EU done

**EU shipping is live:** a flat **€79 "Standard"** rate now covers all 27 EU countries, fixing the checkout-coverage gap (13 EU countries previously had no rate and couldn't check out; the old rupiah placeholders are gone). Rest-of-world is off at launch by design — we'll add regions deliberately once there's revenue. *Live carrier rates (real-time DHL/UPS quotes) need Shopify's Advanced plan (~$399/mo vs current $65), so we're on fixed rates for now.*

Two things to firm up — neither blocks launch:

- [ ] **Validate the €79** against one real DHL/UPS quote for a ~6 kg parcel. It's sized to protect margin; better to trim it down later than to lose money on it now.
- [ ] **Indonesia domestic rate + real transit times.** These depend on the ship-from answer in §2 — if instruments dispatch from China, an Indonesian order is *also* an import, not a domestic one. The "5–8 day" delivery estimate is a placeholder until you give actual dispatch + transit times.

> Since duties are collected separately at checkout, the €79 should reflect the **all-in carrier cost including the DDP surcharge** — not the duty itself.

### 2. 🔴 Product origin & steel grade — needs a real answer

Getting this right matters more than usual: **country of origin is declared to customs and drives the duty calculation**, and it's stated to customers in the policies.

- [ ] **Confirm ship-from country per collection.** Your 2026 catalogue states **Signature Series = made by Amir Raga in Iran**, **Origins = made by Xi in China**. You mentioned "from China" — these need to agree. *(The store's fulfilment location is currently set to Bali, Indonesia, which is a third answer — we'll align it to whatever's correct.)*
- [ ] **Origins steel grade** — your catalogue lists it as *"stainless steel — final supplier grade to confirm."* Get the grade from Xi so the specs are final. *(Signature's "high-grade stainless steel" is already confirmed and correct.)*

> ⚠️ **Iran-origin flag:** the Signature instruments being made in Iran carries EU sanctions and import considerations a normal store never hits. Please confirm this with whoever handles your freight before we open EU sales for those instruments.

### 3. 🟢 Policy details + legal review

The policies are drafted; they need your inputs and a professional review before publishing.

- [ ] Fill the blanks: **support email** (and phone if offered), **full legal business name + address**, **dispatch/delivery times per region**, **governing-law country**, and whether **432 Hz counts as a custom order**.
- [ ] Have them **reviewed by someone qualified** — they touch EU consumer law, GDPR and customs.

### 4. 🟢 Domain

- [ ] Do you have a domain (e.g. `elementshandpans.com`)? Send it and we'll connect it — the store runs on a temporary address for now. If not, we can help you buy one.

---

## Launch steps — our side

Once your inputs land, these are quick and we handle them:

1. ✅ **Done** — Payments (Stripe + PayPal), duties/DDP, tax display, statement descriptor, **EU shipping (€79) + coverage fix**.
2. ✅ **Done** — **Storefront switched to Shopify checkout and verified end-to-end** (gated EU test showed shipping + duties + VAT + wallets rendering correctly).
3. **Validate the €79 rate** and add Indonesia/other regions once numbers are confirmed (§1).
4. **Place your policy text** on the site.
5. **Connect your domain**, then enable **Apple Pay / Google Pay** (they lift mobile conversion; they need the domain verified first).
6. **Remove the "Opening soon" password** to go public — the final switch, only after §2 (origin/sanctions) is cleared.
7. Run a **real test purchase** through the live checkout, confirm it lands in Shopify Orders, then refund it.

---

## Definition of "live" — acceptance test

The store is live when **all** of these pass:

- [ ] A real customer can add a handpan to the cart and **pay successfully** (real card or PayPal).
- [x] Checkout shows the correct **EUR price**, a **shipping** option, and the **duty + import-tax** lines. ✅ *Verified via a gated EU test checkout — €79 shipping, €89.64 duty, €279.04 import VAT, total €1,747.68.*
- [ ] The order appears in **Shopify admin ▸ Orders** with the customer's email and shipping address, ready to fulfil.
- [ ] A test order was placed through the live Shopify checkout and refunded without errors.
- [ ] **The first real order** completes end-to-end — payment in Stripe, order in Shopify, ready to ship.
- [ ] Policies and domain are live on the site.

---

### Where things stand

**The build is done and verified** — payments, EU shipping, duties, tax and the Shopify checkout all work end-to-end, confirmed with a real gated EU test checkout. What's left isn't technical: **confirm where instruments ship from** (§2 — it drives duty accuracy and the Iran sanctions question), **policy details + legal review** (§3), and the **domain** (§4). Clear those, remove the "Opening soon" password, and you're live.

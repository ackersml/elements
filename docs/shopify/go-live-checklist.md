# Elements Handpans — Go-Live Checklist

**For:** Dany · **Storefront:** elements-snowy.vercel.app *(custom domain pending)*
**Checkout:** Shopify hosted checkout — payments, shipping, duties and orders all run natively in Shopify.
**Status:** Payments, duties and tax are configured and live. **The one thing blocking launch is your shipping rates** — until they're set, customers in most of the EU can't complete an order. Product-origin details also need a proper confirmation (see §2). Everything else is polish.

---

## Already done (no action needed)

- ✅ **All 20 products** — descriptions, specs, prices, photos, SEO.
- ✅ **Base currency = EUR.** Prices show and charge in euros (e.g. €1,300).
- ✅ **Collections** — Signature Series, Origins, Cases & Accessories.
- ✅ **Payments are live.** Shopify checkout takes cards via **Stripe** (connected to your Cornerstone Devs account) and **PayPal**. Live mode, cards + PayPal enabled.
- ✅ **Duties & import taxes set up (DDP).** For the **EU and Indonesia**, import duty and VAT are calculated by Avalara and **added as separate lines at checkout** (0.5% Shopify fee on those orders). The customer pays them up front, so **no surprise customs bill on delivery** — a genuine selling point for high-value instruments.
- ✅ **Tax handling decided + set.** You keep your listed price; import VAT is added on top at checkout (not absorbed). Sales tax is correctly set to "not collecting" (you're not EU VAT-registered).
- ✅ **Card-statement name** shows **ELEMENTS HANDPANS** (reduces disputes).
- ✅ **Policies drafted** — Shipping, Refunds/Returns, Privacy, Terms are written and ready for your details + a legal review (see §3).

> **Note on orders:** with Shopify checkout, every paid order lands in your **Shopify admin ▸ Orders**, with the customer's details and shipping address, ready for you to fulfil by hand. (The earlier database order-recording we built was for a different checkout approach and is now on standby.)

---

## What we need from you

### 1. 🔴 Shipping rates — the one blocker

This is the only thing stopping go-live. Two problems:

- The rates currently in the store are **leftover placeholders in rupiah** from before the euro switch — e.g. ~€19 to ship worldwide, which is far below the real cost of sending a 4.5 kg instrument. They can't be used.
- **13 of the 27 EU countries have no shipping rate at all**, so those customers literally cannot check out.

We're using **fixed rates** (you set the prices; the customer picks the option at checkout). *Live carrier rates — real-time DHL/UPS quotes — need Shopify's Advanced plan (~$399/mo vs your current $65), so we've held off; we can revisit once there's revenue.*

- [ ] Send us your shipping cost for one instrument (and a case, if different) for: **EU**, **Indonesia (domestic)**, and **rest of world** (or "not shipping there yet").
- [ ] How many options per region? e.g. just **Standard**, or **Standard + Express** so the customer chooses.

> Since duties are now collected separately at checkout, these should be your **all-in carrier cost including the DDP surcharge** — not the duty itself.

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

1. ✅ **Done** — Payments (Stripe + PayPal), duties/DDP, tax display, statement descriptor.
2. **Enter your shipping rates** and fix the zone/market coverage so all EU countries (and anywhere else you ship) can check out.
3. **Place your policy text** on the site.
4. **Connect your domain**, then enable **Apple Pay / Google Pay** (they lift mobile conversion; they need the domain verified first).
5. **Switch the storefront over to Shopify checkout** (one config change + redeploy).
6. Run a **real test purchase** through the live checkout, confirm it appears in Shopify Orders, then refund it.

---

## Definition of "live" — acceptance test

The store is live when **all** of these pass:

- [ ] A real customer can add a handpan to the cart and **pay successfully** (real card or PayPal).
- [ ] Checkout shows the correct **EUR price**, a **shipping** option, and the **duty + import-tax** lines.
- [ ] The order appears in **Shopify admin ▸ Orders** with the customer's email and shipping address, ready to fulfil.
- [ ] A test order was placed through the live Shopify checkout and refunded without errors.
- [ ] **The first real order** completes end-to-end — payment in Stripe, order in Shopify, ready to ship.
- [ ] Policies and domain are live on the site.

---

### Where things stand

**The heavy lifting is done** — payments, duties, tax and the checkout itself are configured and working. The store is one step from taking orders. That step is **your shipping rates** (§1), and alongside it the **origin/steel confirmation** (§2), which we need correct before instruments cross a border. Send those over and we can finish coverage, run a live test, and go live within a day.

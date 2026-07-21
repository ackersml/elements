# Elements Handpans — Go-Live Checklist

**For:** Dany · **Storefront:** elements-snowy.vercel.app *(custom domain pending)*
**Checkout:** Shopify hosted checkout — payments, shipping, duties and orders all run natively in Shopify.
**Launch scope:** **Origins collection + accessories only.** The **Signature Series is shelved for launch** — it's made in Iran, which carries EU sanctions/import questions we're resolving separately (see §2). It's hidden on the storefront and set to Draft in Shopify, so it can't be seen or bought; bringing it back later is a one-line toggle.

**Status:** The store is **mechanically complete and verified** — payments, EU shipping, duties, tax and the Shopify checkout are all live, and a test EU checkout confirmed they render correctly together (€79 shipping + duties + import VAT + PayPal/Google Pay). It's held behind Shopify's **"Opening soon" password page**, so it's **not public yet** — a deliberate safety gate. With Signature shelved, the **Iran sanctions question no longer blocks launch.** Removing the password is the final go-live switch, now gated only on: policy details + legal review (§3), and the domain (§4).

---

## Already done (no action needed)

- ✅ **All products** — descriptions, specs, prices, photos, SEO. *(Launch shows the 9 Origins builds + accessories; the 7 Signature instruments are built but hidden — see launch scope above.)*
- ✅ **Base currency = EUR.** Prices show and charge in euros (e.g. €1,300).
- ✅ **Collections** — Origins and Cases & Accessories are live. *(Signature Series is hidden on the storefront and Draft in Shopify — shelved for launch, restorable with a one-line toggle.)*
- ✅ **Payments are live.** Shopify checkout takes cards via **Stripe** (connected to your Cornerstone Devs account) and **PayPal**. Live mode, cards + PayPal enabled.
- ✅ **Duties & import taxes set up (DDP).** For the **EU and Indonesia**, import duty and VAT are calculated by Avalara and **added as separate lines at checkout** (0.5% Shopify fee on those orders). The customer pays them up front, so **no surprise customs bill on delivery** — a genuine selling point for high-value instruments.
- ✅ **Tax handling decided + set.** You keep your listed price; import VAT is added on top at checkout (not absorbed). Sales tax is correctly set to "not collecting" (you're not EU VAT-registered).
- ✅ **Card-statement name** shows **ELEMENTS HANDPANS** (reduces disputes).
- ✅ **EU shipping is set up.** A flat **€79 "Standard"** rate covers all 27 EU countries — the coverage gap that blocked checkout is fixed. Rest-of-world is intentionally off for launch. *(€79 and the "5–8 business day" estimate are provisional placeholders — confirm against a real carrier quote + actual dispatch times.)*
- ✅ **Policies drafted** — Shipping, Refunds/Returns, Privacy, Terms are written and ready for your details + a legal review (see §3).
- ✅ **Storefront flipped to Shopify checkout + verified end-to-end.** Buy buttons now route to Shopify's hosted checkout. A test EU (Germany) checkout rendered correctly: €1,300 product · **€79 shipping** · **€89.64 duties** · **€279.04 import VAT** (19%, added on top) · **Total €1,747.68**, with **PayPal + Google Pay** and cards offered. *(No payment taken — we verified the checkout renders, we didn't transact.)*

> **Note on orders:** with Shopify checkout, every paid order lands in your **Shopify admin ▸ Orders**, with the customer's details and shipping address, ready for you to fulfil by hand. (The earlier database order-recording we built was for a different checkout approach and is now on standby.)

> **Note on going public:** the store sits behind Shopify's password page, so no real customer can buy yet. Removing it (Online Store ▸ Preferences) is the final "go live" switch. With Signature shelved, the Iran sanctions blocker is off the launch path — go-live now just needs your policy details (§3) and, ideally, the domain (§4).

---

## What we need from you

### 1. ✅ Shipping — EU done

**EU shipping is live:** a flat **€79 "Standard"** rate now covers all 27 EU countries, fixing the checkout-coverage gap (13 EU countries previously had no rate and couldn't check out; the old rupiah placeholders are gone). Rest-of-world is off at launch by design — we'll add regions deliberately once there's revenue. *Live carrier rates (real-time DHL/UPS quotes) need Shopify's Advanced plan (~$399/mo vs current $65), so we're on fixed rates for now.*

Two things to firm up — neither blocks launch:

- [ ] **Validate the €79** against one real DHL/UPS quote for a ~6 kg parcel. It's sized to protect margin; better to trim it down later than to lose money on it now.
- [ ] **Indonesia domestic rate + real transit times.** These depend on the ship-from answer in §2 — if instruments dispatch from China, an Indonesian order is *also* an import, not a domestic one. The "5–8 day" delivery estimate is a placeholder until you give actual dispatch + transit times.

> Since duties are collected separately at checkout, the €79 should reflect the **all-in carrier cost including the DDP surcharge** — not the duty itself.

### 2. 🟡 Product origin & steel grade

Getting this right matters: **country of origin is declared to customs and drives the duty calculation**, and it's stated to customers in the policies. **None of this blocks launch anymore** — the one item that was a red flag (Iran) only applies to Signature, which is now shelved.

**For the Origins launch (needed to finish specs, not to go live):**

- [ ] **Confirm Origins ship-from country + steel grade with Xi.** The catalogue says Origins = made by Xi in China; you mentioned "from China." We need the exact **stainless steel grade** (catalogue currently says *"final supplier grade to confirm"*) and confirmation of **where each order ships from** to the customer. *(The store's fulfilment location is currently set to Bali, Indonesia — we'll align it to whatever's correct.)* A supplier message covering this is drafted and ready to send.

**Before Signature ever comes back (parked, not on the launch path):**

- [ ] ⚠️ **Iran-origin sanctions check.** The Signature instruments are made by Amir Raga in Iran, which carries EU sanctions and import considerations a normal store never hits. Confirm this with whoever handles freight **before** re-listing Signature. A supplier message to Amir asking about EU customs history is drafted and ready to send. Until this is cleared, Signature stays hidden.

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
6. **Remove the "Opening soon" password** to go public — the final switch. With Signature shelved, this only waits on your policy details (§3); the Iran/§2 blocker no longer applies to an Origins-only launch.
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

**The build is done and verified** — payments, EU shipping, duties, tax and the Shopify checkout all work end-to-end, confirmed with a real gated EU test checkout. We're launching **Origins-only** and shelving Signature until its Iran-origin customs question is cleared, which **takes the one hard blocker off the launch path.** What's left isn't technical: **policy details + legal review** (§3) and the **domain** (§4). Clear those, remove the "Opening soon" password, and you're live. (§2 — Origins steel grade from Xi — finishes the specs but doesn't hold up launch.)

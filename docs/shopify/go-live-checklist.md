# Elements Handpans — Go-Live Checklist

**For:** Dany · **Storefront:** **elementshandpans.com** *(live — domain connected)*
**Checkout:** Shopify hosted checkout — payments, shipping, duties and orders all run natively in Shopify.
**Launch scope:** **Origins collection + accessories only.** The **Signature Series is shelved for launch** — it's made in Iran, which carries EU sanctions/import questions we're resolving separately (see §2). It's hidden on the storefront and set to Draft in Shopify, so it can't be seen or bought; bringing it back later is a one-line toggle.

**Status:** The store is **mechanically complete and verified** — payments, EU shipping, duties, tax and the Shopify checkout are all live, and a test EU checkout confirmed they render correctly together (€79 shipping + duties + import VAT + PayPal/Google Pay). The **domain is connected** and the **policies are written, legally reviewed and published in Shopify**.

Checkout is still held behind Shopify's **"Opening soon" password page**, so no real customer can buy yet — a deliberate safety gate. The site is also deliberately **hidden from Google** until launch. With Signature shelved, the Iran sanctions question no longer blocks launch. **One item remains before going public: appointing an EU representative (§3).**

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
- ✅ **Policies written, reviewed and published.** Shipping, Refunds/Returns, Privacy, Terms **and** the EU-required Contact information are all live in Shopify (behind the password). They've been reviewed against **PIPEDA, CASL, Ontario's *Consumer Protection Act, 2002* and *Sale of Goods Act***, plus EU consumer law, and updated accordingly. All the blanks are filled — see §3 for the single remaining item.
- ✅ **Legal entity set.** Merchant of record and data controller = **Michelle Ackers, sole proprietor carrying on business as Cornerstone Devs**, 525 Adelaide St W, Toronto, ON M5V 0N7. Governing law = **Ontario, Canada**.
- ✅ **Domain connected.** **elementshandpans.com** is live on the storefront (auto-renews Jul 2027). `www` redirects to the bare domain, SSL issued. *This also unlocks Apple Pay / Google Pay.*
- ✅ **Hidden from Google until launch.** The store is reachable at the real domain but carries `noindex` + a `robots.txt` block, so nothing gets indexed while checkout is still gated. One toggle flips it at launch (see Launch steps).
- ✅ **Storefront flipped to Shopify checkout + verified end-to-end.** Buy buttons now route to Shopify's hosted checkout. A test EU (Germany) checkout rendered correctly: €1,300 product · **€79 shipping** · **€89.64 duties** · **€279.04 import VAT** (19%, added on top) · **Total €1,747.68**, with **PayPal + Google Pay** and cards offered. *(No payment taken — we verified the checkout renders, we didn't transact.)*

> **Note on orders:** with Shopify checkout, every paid order lands in your **Shopify admin ▸ Orders**, with the customer's details and shipping address, ready for you to fulfil by hand. (The earlier database order-recording we built was for a different checkout approach and is now on standby.)

> **Note on going public — there are two switches, and they flip together.** (1) Remove Shopify's "Opening soon" password (Online Store ▸ Preferences), and (2) turn search-engine indexing back on (a one-line change we make, then redeploy). Flip only the password and the store can take orders but stays invisible to Google; flip only indexing and Google finds a shop that can't sell. We'll do both in one go when you say the word.

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

### 3. 🔴 EU representative (GDPR Art. 27) — the one thing left before launch

The policies are **done**: written, reviewed against Ontario/Canada and EU law, all blanks filled, and published in Shopify. Support email is `hello@elementshandpans.com`, 432 Hz is treated as a standard tuning (full 14-day EU returns), and support is email-only at launch.

One genuine legal obligation remains:

- [ ] **Appoint an EU representative.** Because the business is Canadian and ships **only** into the EU, GDPR Art. 27 requires a named representative inside the EU as a contact point for customers and regulators. The "occasional processing" exemption doesn't apply — selling to the EU is the business model, not incidental. Outsourced services run **~€200–500/year** (VeraSafe, DataRep, GDPR Local and similar). Once appointed, send us the name + EU address and we'll drop it into the Privacy policy, where a placeholder is already waiting.

> Not doing this is an Art. 83 fine risk (up to €10M or 2% of turnover) for something that costs a few hundred euros to fix. It's the last real box to tick.

### 4. ✅ Domain — done

**elementshandpans.com** is live and serving the storefront, with `www` redirecting to the bare domain and SSL issued. It auto-renews in July 2027.

- [ ] **Optional, now unlocked:** enable **Apple Pay / Google Pay** in Shopify. They needed a verified domain, which you now have, and they measurably lift mobile conversion.

---

## Launch steps — our side

Once your inputs land, these are quick and we handle them:

1. ✅ **Done** — Payments (Stripe + PayPal), duties/DDP, tax display, statement descriptor, **EU shipping (€79) + coverage fix**.
2. ✅ **Done** — **Storefront switched to Shopify checkout and verified end-to-end** (gated EU test showed shipping + duties + VAT + wallets rendering correctly).
3. ✅ **Done** — **Policies written, legally reviewed and published** in Shopify (incl. the EU-required contact information).
4. ✅ **Done** — **Domain connected** (elementshandpans.com, www redirect, SSL) and the site held back from Google until launch.
5. **Add the EU representative's details** to the Privacy policy as soon as you've appointed one (§3).
6. **Validate the €79 rate** and add Indonesia/other regions once Xi's numbers are confirmed (§1, §2).
7. Enable **Apple Pay / Google Pay** (now unblocked by the domain).
8. **Go live — both switches together:** remove the **"Opening soon" password** *and* **re-enable search indexing** (one-line change + redeploy on our side).
9. Run a **real test purchase** through the live checkout, confirm it lands in Shopify Orders, then refund it.

---

## Definition of "live" — acceptance test

The store is live when **all** of these pass:

- [ ] A real customer can add a handpan to the cart and **pay successfully** (real card or PayPal).
- [x] Checkout shows the correct **EUR price**, a **shipping** option, and the **duty + import-tax** lines. ✅ *Verified via a gated EU test checkout — €79 shipping, €89.64 duty, €279.04 import VAT, total €1,747.68.*
- [ ] The order appears in **Shopify admin ▸ Orders** with the customer's email and shipping address, ready to fulfil.
- [ ] A test order was placed through the live Shopify checkout and refunded without errors.
- [ ] **The first real order** completes end-to-end — payment in Stripe, order in Shopify, ready to ship.
- [x] **Policies and domain are live on the site.** ✅ *elementshandpans.com is connected; all policies + contact information are published in Shopify.*
- [ ] The **EU representative** is appointed and named in the Privacy policy.
- [ ] Search indexing is **switched back on** and the store is findable on Google.

---

### Where things stand

**The build is done, the domain is live, and the policies are written, legally reviewed and published.** Payments, EU shipping, duties, tax and the Shopify checkout all work end-to-end, confirmed with a real gated EU test checkout. We're launching **Origins-only**, with Signature shelved until its Iran-origin customs question is cleared — which took the one hard blocker off the launch path.

**Exactly one thing now stands between you and going live: appointing an EU representative (§3)** — a ~€200–500/year service, required because you're a Canadian business shipping into the EU. Sort that, send us the details, and we flip the two go-live switches (password off, indexing on) the same day.

Everything else is optional polish that can happen after launch: Xi's steel grade and real transit times (§2), validating the €79 rate (§1), and turning on Apple/Google Pay (§4).

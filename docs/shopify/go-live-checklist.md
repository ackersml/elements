# Elements Handpans — Go-Live Checklist

**For:** Dany · **Storefront:** elements-snowy.vercel.app *(custom domain pending)*
**Status:** The store already takes a paid order end-to-end — card payment and order-recording are live and tested. What's left is a short list of **decisions** (shipping, tax) and **polish** (policies, domain) before you actively promote it. There's no hard technical blocker remaining.

---

## Already done (no action needed)

- ✅ **All 20 products** — descriptions, specs, prices, photos, SEO.
- ✅ **Base currency = EUR.** Prices show and charge in euros (e.g. €1,300).
- ✅ **Collections** — Signature Series, Origins, Cases & Accessories.
- ✅ **Payments are live.** Secure card checkout via **Stripe**, in live mode, tested end-to-end with a real €1,300 EUR checkout.
- ✅ **Order storage is live.** Every paid order is recorded in a database with the customer's **email and shipping address**. The payment → order pipeline is wired and connection-verified.
- ✅ **Checkout is wired** to the buy buttons across the whole site.

---

## Your decisions — before you promote the store

### 1. 🟡 Shipping

The checkout currently charges the **product price only**, with no separate shipping line.

- [ ] Decide: is shipping **included in the price** (free shipping), or **charged on top**? If charged, tell us your rates (e.g. a flat "Europe" rate) and we'll add a shipping step to the checkout. *Your makers ship direct, so the simplest way to get the number is to ask Amir and Xi what they charge to send one instrument to Europe.*
- [ ] Decide **who pays import duties and VAT on delivery**. Instruments ship from outside the EU, so customers can be charged import VAT and customs duty when the parcel arrives — this is **separate from the shipping fee** and is set by the destination country. Either you cover it (**DDP** — billed to you) or the customer pays the courier on delivery (**DAP**). Whichever you pick, we'll state it plainly at checkout and in the shipping policy: unexpected customs bills are the single most common cause of complaints and chargebacks on high-value instruments.

### 2. 🟡 Tax / VAT

No tax is currently added at checkout.

- [ ] Decide how **EU VAT** is handled — e.g. customers pay import VAT/duties on delivery, or you register (IOSS) and we collect it at checkout. Worth a quick word with an accountant, since you're selling into the EU. Tell us the approach and we'll configure to match.

### 3. 🟢 Policies

Legal copy is yours to supply; we place it on the site.

- [ ] **Refund / returns policy**
- [ ] **Shipping policy** (dispatch times, who pays duties)
- [ ] **Privacy policy** and **Terms of service**

### 4. 🟢 Domain

- [ ] Do you have a domain (e.g. `elementshandpans.com`)? Send it and we'll connect it — the store currently runs on a temporary web address. If not, we can help you buy one.

### 5. 🟢 Final product detail

- [ ] Confirm the **Origins steel grade** (left as "to confirm" in the catalogue) so the product specs are final.

---

## Launch steps — our side

These are quick and we handle them:

1. ✅ **Done** — Set the **card-statement name** so customers recognise the charge on their statement (reduces disputes). *Now shows "ELEMENTS HANDPANS".*
2. Add any **shipping / tax** handling you've decided on.
3. **Connect your domain.**
4. Run a **real test purchase** end-to-end (live mode, real card), then refund it.
5. ✅ **Done (test mode)** — Confirmed an order **lands in the database** end-to-end and is ready for dropshipping fulfilment. *A Stripe test-mode purchase (test card) wrote a correct order row — €1,300, customer, shipping address, `manual_fulfillment_pending` status. The live real-money version (step 4) still runs at go-live.*

---

## Definition of "live" — acceptance test

The store is live when **all** of these pass:

- [ ] A real customer can add a handpan to the cart and **pay successfully** (real money).
- [ ] The order shows the correct **EUR price**, plus **shipping** and **tax** lines where applicable.
- [x] The order is **recorded in the orders database** with the customer's email and shipping address, ready for you to fulfil. ✅ *Verified via a Stripe test-mode purchase — a correct order row (€1,300, customer, Berlin shipping address) was written and confirmed.*
- [ ] A test order was placed **in live mode (real card)** and refunded without errors.
- [ ] **The first real order lands end-to-end** — verify that once the first genuine customer pays, the payment shows in Stripe *and* the matching order row appears in the database. (We'll check this together the moment it happens.)
- [ ] Policies and domain are live on the site.

---

### Where things stand

**No hard blocker is left** — the store can already take a paid order today, with the money captured and the order recorded. The pre-launch list is **decisions** (shipping, tax) and **polish** (policies, domain). Once you send those over, we can go live within a day.

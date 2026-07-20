# Elements Handpans — Go-Live Checklist

**For:** Dany · **Storefront:** elements-snowy.vercel.app *(custom domain pending)*
**Status:** The store already takes a paid order end-to-end — card payment and order-recording are live and tested. Tax is settled (nothing to charge at checkout). What's left is your **shipping rates**, confirming **who covers import duties**, and **polish** (policies, domain). There's no hard technical blocker remaining.

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
- [ ] Confirm **who pays import duties and VAT on delivery**. Because you're not VAT-registered in the EU, these are collected at the border rather than at checkout (see item 2). **The default is DAP** — the customer pays the courier on delivery. On a €1,300 instrument into a country with 19–21% VAT that's roughly **€250–270 on top**, plus any duty — a large surprise if it isn't flagged up front. The alternative is **DDP**: you pre-pay through the courier and build it into your prices (you *can* do this without being VAT-registered — it simply costs more and adds admin). Either way we'll state it plainly at checkout and in the shipping policy, because an unexpected customs bill on a high-value instrument is the most common cause of refund demands and chargebacks.

### 2. ✅ Tax / VAT — decided, nothing to do

**No tax is charged at checkout, and none should be.** You're not VAT-registered in the EU, and IOSS — the scheme that lets a seller collect EU VAT at checkout — only covers consignments up to **€150**, far below these instruments. EU VAT and duty are therefore collected **at the border** by the courier on delivery, not by us.

Nothing to configure: the store already works this way. It does make the duties wording in item 1 important — if we charged VAT at checkout *as well*, customers would pay it twice and we'd be dealing with refund demands.

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

**No hard blocker is left** — the store can already take a paid order today, with the money captured and the order recorded. Tax is now settled (nothing to charge at checkout). What remains is your **shipping rates**, confirming **who covers duties**, and **polish** (policies, domain). Once those come over, we can go live within a day.

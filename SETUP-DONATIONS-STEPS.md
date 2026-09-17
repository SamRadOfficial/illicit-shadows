# Stripe donate links: every field, filled in

You need: the Stripe dashboard in **live mode**, and `data/site.json` open in the repo.
Result: six working donate buttons on the site. No code changes.

---

## Before the first link

- **Switch the dashboard to live mode.** Test-mode links do not work in live mode. If you want to
  rehearse, do it in test mode first and then rebuild the six for real.
- **Turn on donations on the account.** Stripe applies extra review to new accounts taking
  donations and it can take a few days, so start it even if the links take longer. Settings,
  Business, and make the business description say what the money funds.
- The money goes to **Illicit Shadows, LLC**. The site already says "Donations are not tax
  deductible" in fine print under the tiers.

---

## One link per tier

**Six links in total, one product each.** A Payment Link charges everything on it, so a single link
holding all five products asks for $36,600. The site points each button at its own URL, and someone
clicking $500 has to land on a $500 checkout.

You do **not** need to recreate the products you already made. On each new link choose **Find or add
a product** and select the existing one. Turn **quantity adjustable** off, so nobody buys two
Founding donor slots by accident.

To check a link you already have: open it. If it lists more than one line item, or the total is not
the tier amount, that is the combined link. Deactivate it (Payment Links, the row's menu,
**Deactivate**) and build six fresh ones. Deactivating cannot break anything: no money has moved.

## The "Add a product" panel, field by field

You will see this six times. Only the name, price and description change.

### Name (required)
Exactly these, because they appear on the Stripe page and on the card statement:

| # | Name |
|---|---|
| 1 | Supporter |
| 2 | Patron |
| 3 | Benefactor |
| 4 | Underwriter |
| 5 | Founding donor |
| 6 | Contributor |

### Description
**Yes, write one.** It shows at checkout, and it is the last thing a donor reads before paying.
The same sentence goes on all six, because every tier funds the same work:

> Supports the investigations, the Museum of Illicit Shadows, and the new products and programming
> built around them.

It promises funding, not benefits. A description sits on the receipt, so anything promised there is
a commitment to honor, and benefits are also what can turn a gift into a sale. Add them per tier
later, once they exist and you know what they cost.

### A note on the ladder
Supporter, Patron, Benefactor is the standard ascending set and needs no explaining. **Underwriter**
at $10,000 is the public-broadcasting word, and it is doing real work: a *sponsor* is generally
understood to have a say, an *underwriter* funds the work and has none. For an outfit publishing
investigations into who pays for what, that distinction is worth owning in the language. It also
travels across a film, an exhibition, or a season of programming.

**Founding donor** sits at the top because it is the only tier that expires: once the museum opens
in 2027 nobody can become one. Scarcity belongs at the top of a ladder, not in the middle.

Whatever the names, say once somewhere public that funders have no editorial control. The first
serious journalist to look at a $25,000 name beside an investigation will ask.

### The Contributor link, which works differently
"Customers choose what to pay" is **not a product setting**. It is a *price* setting, and it only
appears while you are creating a new price on a one-time payment. That is why it cannot be found on
a product that already has a fixed amount.

Create it like this:

1. **Payment Links** → **Create**.
2. Product: **+ Add new product**. Name it **Contributor**. Description as above. Same image.
3. In the **Pricing** block, before typing an amount, open the price-type control (it reads
   "Choose your pricing model" or sits under **More pricing options** depending on the account) and
   pick **Customers choose what to pay**.
4. Fill the three fields it reveals: **Suggested amount** $250, **Minimum** $5, **Maximum** leave
   empty.
5. Leave the payment type as **One-time**. Stripe does not allow a customer-chosen amount on a
   recurring price, which is the usual reason the option is greyed out or missing.
6. Advanced options → call to action **Donate**. After payment → redirect to the site. Create, copy
   the link.

If the option still is not there, the fallback is the API or the Stripe CLI:

```
stripe prices create \
  --currency=usd \
  --product-data[name]=Contributor \
  --custom-unit-amount[enabled]=true \
  --custom-unit-amount[preset]=25000 \
  --custom-unit-amount[minimum]=500
```

(amounts in cents), then build a Payment Link against the price it returns. But step 3 is almost
always the answer: the control is easy to miss because it sits above the amount field rather than
beside it.

### Product category
Stripe is suggesting **Cash Donation**, which is the right shape. One caution worth raising, though
this is an accountant's call and not mine: a true cash donation gives the payer nothing in return,
and tiers that promise recognition, naming, or numbered editions can be treated as a sale rather
than a gift. Two practical notes:

- This field only drives **Stripe Tax**. If Stripe Tax is off, it changes nothing today.
- If your accountant says these are sales, the category becomes a general service code and you may
  owe sales tax in some states. Worth one email before the first $25,000 arrives.

### More options
Leave the defaults. The one worth setting is **Statement descriptor** if it is available: make it
`ILLICIT SHADOWS` so the card line is recognizable and you get fewer chargebacks.

### Pricing

| # | Price | Type |
|---|---|---|
| 1 | $100 | **Recurring, monthly** |
| 2 | $500 | **Recurring, monthly** |
| 3 | $1,000 | One-off |
| 4 | $10,000 | One-off |
| 5 | $25,000 | One-off |
| 6 | Customers choose what to pay | One-off only, suggested $250, minimum $5 |

Currency **USD**. A monthly $100 patron is worth $1,200 a year against a single $100 gift, which is
why the two lower tiers are recurring.

---

## After the product, on the link itself

1. **Advanced options** → call to action → **Donate**. On all six.
2. **After payment** → Redirect to your website → `https://illicitshadows.com/`
   (use the Vercel URL until DNS moves).
3. **Collect customer addresses**: off, unless you will post something. If you do, turn it on for
   tiers 3, 4 and 5 only.
4. **Create**, then copy the link: `https://buy.stripe.com/xxxxxxxxxxxx`.

---

## Paste them into the site

`data/site.json`, six empty `url` fields:

```json
"support": {
  "note": "",
  "tiers": [
    { "label": "$100",    "name": "Supporter",          "url": "https://buy.stripe.com/AAAA" },
    { "label": "$500",    "name": "Patron",             "url": "https://buy.stripe.com/BBBB" },
    { "label": "$1,000",  "name": "Benefactor",     "url": "https://buy.stripe.com/CCCC" },
    { "label": "$10,000", "name": "Underwriter",    "url": "https://buy.stripe.com/DDDD" },
    { "label": "$25,000", "name": "Founding donor", "url": "https://buy.stripe.com/EEEE" }
  ],
  "custom": { "label": "Contributor", "name": "Choose your amount", "url": "https://buy.stripe.com/FFFF" }
}
```

```
git add -A
git commit -m "Connect Stripe donate links"
git push origin main
```

A tier with no URL simply does not render, so four now and two later is fine.

---

## Check it worked

1. Live site, support band above the footer: six buttons.
2. Click $100. Stripe's page should say **Donate**, show $100 monthly, your image, and your
   description.
3. Pay $1 through the custom link with a real card, then refund it in the dashboard. That tests the
   whole path, including the redirect back, for about 33 cents in fees.

---

## Worth knowing

- **Fees**: 2.9% + 30c. On $25,000 that is roughly $755. For the top two tiers, offering a bank
  transfer by email may be worth more than the convenience; the enquiry button beside the tiers
  already routes those conversations to you.
- **Receipts**: Stripe emails a payment receipt automatically. It is not a charitable receipt.
- **Recurring donors** can cancel from the emailed receipt link. Nothing for you to build.
- **Refunds and disputes** happen in the dashboard; the site needs no change.

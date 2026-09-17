# Stripe donate links: do this in one sitting

You need: the Stripe dashboard, and `data/site.json` open in the repo.
Result: six working donate buttons. No code changes.

---

## Before you start

**Turn on donation support on the account.** Stripe applies extra review to new accounts taking
donations, and it can take a few days. Do this first, even if the links take longer:
Dashboard, Settings, Business, and make sure the business description says what the money funds
(museum exhibitions, research, and public programming).

**The money goes to Illicit Shadows, LLC.** Your decision, and the site says "Donations are not tax
deductible" in fine print under the tiers. Nothing else to configure for that.

---

## 1. Create six Payment Links

Dashboard, **Payment Links**, **Create**. Repeat six times.

| # | Product name | Price | Notes |
|---|---|---|---|
| 1 | Supporter | $100 | consider **Recurring, monthly** |
| 2 | Patron | $500 | consider **Recurring, monthly** |
| 3 | Founding donor | $1,000 | one-off |
| 4 | Hall sponsor | $10,000 | one-off |
| 5 | Exhibition sponsor | $25,000 | one-off |
| 6 | Contribution | customers choose | **one-off only** |

For each link:

1. **Products or subscriptions** → **+ Add new product** → name it from the table → set the price.
   For number 6 instead choose **Customers choose what to pay**, set a suggested amount ($250 is a
   reasonable default) and a $5 minimum.
2. Open **Advanced options** and set the **call to action** to **Donate**. Do this on all six; the
   button then matches the site.
3. Under **After payment**, choose **Redirect to your website** and enter
   `https://illicitshadows.com/` (or the Vercel URL until DNS moves).
4. Leave **Collect customer addresses** off unless you plan to post anything physical. If you do
   want addresses, turn it on for the $1,000 tier and above only.
5. **Create**, then copy the link. It looks like `https://buy.stripe.com/xxxxxxxxxxxx`.

---

## 2. Paste them into the site

Open `data/site.json` and fill in the six empty `url` fields:

```json
"support": {
  "note": "",
  "tiers": [
    { "label": "$100",    "name": "Supporter",          "url": "https://buy.stripe.com/AAAA" },
    { "label": "$500",    "name": "Patron",             "url": "https://buy.stripe.com/BBBB" },
    { "label": "$1,000",  "name": "Founding donor",     "url": "https://buy.stripe.com/CCCC" },
    { "label": "$10,000", "name": "Hall sponsor",       "url": "https://buy.stripe.com/DDDD" },
    { "label": "$25,000", "name": "Exhibition sponsor", "url": "https://buy.stripe.com/EEEE" }
  ],
  "custom": { "label": "Choose an amount", "url": "https://buy.stripe.com/FFFF" }
}
```

Then:

```
git add -A
git commit -m "Connect Stripe donate links"
git push origin main
```

Each tier appears the moment its URL exists. Leave one blank and it simply does not show, so you can
ship four now and two later.

---

## 3. Check it worked

1. Open the live site. The support band above the footer should show six buttons.
2. Click the $100 one. Stripe's page should say **Donate**, show $100, and carry your business name.
3. Use Stripe's test card `4242 4242 4242 4242`, any future expiry, any CVC, **in test mode** if you
   want to rehearse; switch the dashboard to live mode and recreate the links for real money.
   Test-mode links do not work in live mode, so create the final six in **live mode**.
4. After paying, confirm you land back on illicitshadows.com.

---

## Worth knowing

- **Fees**: 2.9% + 30c per transaction in the US. On $25,000 that is about $755, so for the top two
  tiers a bank transfer may be worth offering by email instead. The enquiry button beside the tiers
  already routes those conversations to you.
- **Receipts**: Stripe emails one automatically. It is a payment receipt, not a charitable receipt.
- **Recurring**: a monthly $100 patron is worth $1,200 a year. Worth making the two lower tiers
  recurring and letting the higher ones stay one-off.
- **Refunds and disputes** are handled in the Stripe dashboard; nothing on the site needs to change.

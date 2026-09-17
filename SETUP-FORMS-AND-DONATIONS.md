# Connecting the forms and the donate buttons

Both are built and tested. Each needs a URL pasted into `data/site.json`. No code changes, no server.

## 1. Forms (10 minutes)

1. Create a Formspree account and two forms: "Contact" and "Newsletter".
   (Basin works identically. So does a Vercel function if you would rather self-host.)
2. Copy each form's endpoint URL.
3. Put them in `data/site.json`:

   ```json
   "forms": {
     "contact": "https://formspree.io/f/xxxxxxxx",
     "signup":  "https://formspree.io/f/yyyyyyyy"
   }
   ```
4. Commit and push. Nothing else changes.

What already works once those URLs exist: the message posts without leaving the page, the form
clears, and the person sees "Message sent." A failure says so and offers the mailto. A bot filling
the hidden `company` field gets silence and nothing is sent. Every enquiry arrives tagged with the
types the person ticked.

Verified against a stub endpoint: success, failure, and the unconnected state.

## 2. Donations (30 minutes, after one decision)

**Decide this first: who receives the money.** Illicit Shadows, LLC is a for-profit company, so
contributions to it are **not tax deductible**, and the words "donor" and "donation" imply otherwise
to most readers. Three options:

- **Keep it in the LLC.** Chosen 16 Sep. The disclosure sentence under the tiers was removed at the
  owner's request; `site.support.note` is still there and empty, so restoring it is one line. Worth
  knowing that a $25,000 institutional funder will usually ask for a charitable receipt, and that
  Stripe asks what the money is for during the account review for donations.
- **Route through a fiscal sponsor** (a 501(c)(3) that accepts gifts on the museum's behalf for a
  fee, typically 5-8%). Donors get a receipt; you get a contract and some admin.
- **Route through ICAIE** if it holds the right status. Then the language can stay as it is.

This is worth settling before the first contribution, not after.

### Then, in Stripe

Stripe's own guide: https://support.stripe.com/questions/how-to-accept-donations-through-stripe

1. Dashboard, **Payment Links**, **Create**.
2. For each fixed tier: **Products or subscriptions**, **+ add new product**, name it for the tier
   ("Founding donor"), set the price, choose **One-off** or **Recurring**.
3. Under **Advanced options**, change the call to action from *Pay* to **Donate**. Worth doing on
   every link: the button then matches the language on the site.
4. Set the success URL to `https://illicitshadows.com/`.
5. Copy each link into `data/site.json` under `support.tiers`.

### A choose-your-own-amount link
Make one more link with **Customers choose what to pay**, optionally with a preset and a minimum,
and paste it into `support.custom.url`. It renders last, in a dashed outline, as "Choose an amount".
One-off only: Stripe does not allow a donor-chosen amount on a recurring link.

### Recurring giving
For the lower tiers, make the price recurring rather than one-off. A monthly patron is usually worth
more over a year than a single gift, and Payment Links handle the subscription for you.

### One timing risk
Stripe applies extra review to new accounts accepting donations or tips, and it can take a few days.
Start that before you need the buttons live, not the week of launch.

### What the site does with all this
Each tier appears the moment its URL exists, and stays invisible until then, so the page never shows
a control that leads nowhere. Checkout is hosted by Stripe: no server, no card data touching this
site, which is what the static export can support. Links open in a new tab.

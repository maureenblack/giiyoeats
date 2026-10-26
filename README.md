# Giiyo Eats

Customer interest page for Giiyo Eats, affordable fresh workplace lunches in Douala, Cameroon. The site is a Next.js app (App Router, TypeScript) meant to deploy on Vercel.

The only page is [`/join`](https://eats.giiyo.com/join). `/` redirects there. Visitors can say what they would like to eat. The page does not take orders, payments, subscriptions, or accounts.

The pilot is in Douala. Launch is Monday 23 November 2026. Meals are 3,000 FCFA, delivery included.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000/join](http://localhost:3000/join).

## Form link

The embedded form is the published Google Form. This repo does not recreate the 11 questions.

Set `NEXT_PUBLIC_GIIYO_EATS_FORM_EMBED_URL` to:

```
https://docs.google.com/forms/d/e/1FAIpQLSe1dsI0Jao2VB3wNTXTkiulzcTiv4bZ79pI8TSiJ0nR6sH7xA/viewform?embedded=true
```

That value is in `.env.example`. Next.js inlines `NEXT_PUBLIC_` variables at build time, so set it in the Vercel project environment before building. If the variable is missing or is not a `https://docs.google.com/forms` URL, `/join` shows “This page is not configured yet” and does not render an iframe.

“Open form in a new tab” uses the same URL with only `embedded=true` removed.

Responses are collected by Google Forms. Only people who answer “Yes, please” to the WhatsApp consent question should receive launch or marketing messages. Submitting the form is not an order.

Contact mail is [hello@giiyotech.com](mailto:hello@giiyotech.com).

## Logo and colour

The approved logo is `public/brand/giiyo-eats-logo.png`. The page references it through the `GIIYO_EATS_LOGO_PATH` constant (`/brand/giiyo-eats-logo.png`). Do not redraw, recompress, or replace that file. It is also the Open Graph image.

Red `#DB1918` and cream `#FEFAEF` are the most frequent red and cream pixels in that file. Headings, buttons, and links use the red. The page background is the cream. Headings use Baloo 2. Body text uses Nunito.

If `public/brand/giiyo-eats-logo.png` is removed, the header shows the words “Giiyo Eats” in the brand red as plain text until the approved file is put back at that path.

## Checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

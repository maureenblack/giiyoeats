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

Contact mail is [eats@giiyo.com](mailto:eats@giiyo.com).

## Logo and colour

The wordmark and smiling mark are the brand-pack files in `public/brand/`, copied unchanged from `Giiyo Eats/Brand/Logo Assets/`. The header and footer use `GiiyoEats_Logo_Wordmark_Red_Transparent.png`. The hero badge uses `GiiyoEats_Logo_Mark_Red_Transparent.png`. Do not redraw, recompress, or trace them. The page references those paths from `lib/brand.ts` and serves them with `<img>`, not `next/image`. The red wordmark is also the Open Graph image.

The hero circle crops Maureen’s vegetable rice with fried chicken (`public/food/vegetable-rice-chicken.jpg`) with `next/image`. The cabbage salad and greens with chicken files sit alongside it in `public/food/`. The join layout has a single food frame, so those two are not placed in extra spots. The small smiling mark stays only as the badge overlapping the circle.

Colours are sampled from the join-page design: red `#DA1B1C`, cream `#FDF9EC`, beige `#F5EAD8`, olive `#7A8A5E`, charcoal `#201E1D`. Headlines use Fraunces (a heavy rounded serif). Body text uses DM Sans.

If the red wordmark file is removed, the header and footer show the words “Giiyo Eats” in the brand red as plain text until the file is put back.

The page does not name neighbourhoods. The footer location is Douala, Cameroon. Contact mail is [eats@giiyo.com](mailto:eats@giiyo.com).

## Checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

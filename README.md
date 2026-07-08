# Ratish.Shop — Premium Muratina

Single-page e-commerce site for Ratish, a brand selling Muratina (traditional Kikuyu fermented drink). React + Vite + Tailwind CSS v4 + Framer Motion + React Three Fiber, deployable as a static site on GitHub Pages.

## Features

- Interactive pour-to-order module: open the tap on the 20L reserve, watch the pale liquid flow with a live liter counter, stop when full, then drag your container into the cart zone.
- 3D scene (React Three Fiber) with automatic lightweight 2D SVG/CSS fallback when WebGL is unavailable, plus a manual "lite view" toggle for low-end devices. The 3D bundle is lazy-loaded so fallback users never download Three.js.
- Product gallery (500 ml / 1 L / 5 L / 20 L) with direct add-to-cart or "pour this size" presets.
- Cart persisted in localStorage; checkout collects name, phone, and delivery address, then opens a pre-filled WhatsApp order message (wa.me link).
- Reviews with custom SVG star ratings, stored in localStorage.
- Zero emojis, zero icon fonts — every icon is a hand-drawn inline SVG in the cream/gold/black palette.
- Muratina liquid rendered everywhere to the same spec: pale, hazy, milky-tea, translucent.

## Setup

```bash
npm install
npm run dev        # local dev server
npm run build      # production build into dist/
npm run preview    # preview the production build
```

## Configuration

- **WhatsApp number**: edit `WHATSAPP_NUMBER` in `src/lib/store.jsx` (digits only, with country code, e.g. `2547XXXXXXXX`).
- **Pricing**: `PRICE_PER_LITER` and the fixed-size `PRODUCTS` list live in the same file.
- **Product photography**: the site ships with illustrated SVG vessels matching the liquid spec. When real photos are ready, drop them in `src/assets/` and swap them into `Hero.jsx` and `Gallery.jsx` — keep the liquid in shot pale and diluted per the brand spec.

## Deploying to GitHub Pages

### Option A — GitHub Actions (recommended)

1. Push this repo to GitHub.
2. In the repo: Settings → Pages → Source → **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes on every push to `main`.

### Option B — gh-pages package

```bash
npm run deploy
```

This builds and pushes `dist/` to a `gh-pages` branch. Then in Settings → Pages, set the source to the `gh-pages` branch.

The Vite config uses `base: "./"`, so the site works at any path (`https://<user>.github.io/<repo>/`) without edits.

## Project structure

```
src/
  components/
    Hero.jsx          # full-bleed hero, headline, CTA
    PourModule.jsx    # pour-to-order state machine, drag-to-cart, presets
    Pour3D.jsx        # React Three Fiber scene (lazy-loaded)
    Pour2D.jsx        # SVG/CSS fallback pour
    Gallery.jsx       # fixed-size product grid
    TrustBadges.jsx   # four custom SVG medallions
    Reviews.jsx       # review cards + modal form
    Cart.jsx          # floating cart, drawer, WhatsApp checkout
    Footer.jsx
    Brand.jsx         # RATISH horn mark, wordmark, gourd divider motif
    Icons.jsx         # all inline SVG icons
    Vessels.jsx       # illustrated vessels with the liquid spec
  lib/
    store.jsx         # cart context, products, pricing, reviews storage
  assets/             # drop real product photography here
```

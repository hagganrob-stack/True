# True Hairdressers – website

Four-page brochure site for Rachel's one-woman salon in Whitnash, Leamington Spa. Built by Rob Haggan (Peak SEO). **BRIEF.md is the full spec – read it before changing anything.**

## Stack

- Astro 7 + TypeScript (strict) + Tailwind CSS 4 (via `@tailwindcss/vite`), static output, `@astrojs/vercel` adapter, `@astrojs/sitemap`.
- **No CMS.** Every fact lives in `src/content/site.ts` (NAP, hours, links, services, qualifications, nav). Pages, footer and JSON-LD all read from it – never hard-code a fact in a page.
- `trailingSlash: 'always'`. `site` comes from `SITE_URL` in `site.ts` (placeholder until the domain is confirmed).
- Fonts are self-hosted via `@fontsource` (Latin subset): Fraunces 500/600 (headings), DM Sans 400/500/600 (body). Fraunces 600 is preloaded.
- Icons: `@lucide/astro`, import per icon (`@lucide/astro/icons/scissors`), `stroke-width={1.5}`.
- Analytics: Vercel Web Analytics + Speed Insights (cookieless). Clicks on any element with `data-track` (Fresha buttons, `tel:` links) fire a custom event; set `data-track-location`.
- JS is limited to: mobile nav toggle (`Header`), open-now/today highlight (`src/scripts/hours.ts`), click-to-load map (`MapEmbed`), and analytics. Everything else is static HTML.

## Commands

```sh
npm run dev       # local dev
npm run check     # astro check (types + diagnostics)
npm run build     # astro check && astro build
node scripts/process-brief-assets.mjs   # re-create src/assets + favicons from brief-assets/
```

## Layout

- `src/content/site.ts` – single source of truth. `confirm('…')` marks a fact still waiting on Rachel.
- `src/lib/schema.ts` – JSON-LD builders (HairSalon sitewide, Person, BreadcrumbList). No AggregateRating/Review.
- `src/layouts/BaseLayout.astro` – head (title, description, canonical, OG/Twitter, JSON-LD, preloads), skip link, header, footer, analytics.
- `src/components/` – Header, Footer, Logo, Hero, SectionLabel, ServiceCard, AboutTeaser, MontyCard, ProductStrip, HoursTable, OpenNow, MapEmbed, BookCTA, BookButton, PhoneLink, Confirm, NewTab.
- `src/assets/photos/` real photos of Rachel and Monty; `src/assets/stock/` stock photos; `src/assets/logos/` True logo + circle mark, Goldwell.
- `brief-assets/` – original files from Basecamp (sources only, not served).

## Design tokens (BRIEF §3.2) – Tailwind names

| Token | Value | Tailwind | Use |
| --- | --- | --- | --- |
| bg | #FAF8F5 | `bg-bg` | page background |
| surface | #FFFFFF | `bg-surface` | cards |
| surface-soft | #EEEBE6 | `bg-surface-soft` | alternating sections |
| ink | #2C2C2C | `text-ink` | **brand charcoal** – text, primary buttons |
| ink-muted | #5F5A52 | `text-ink-muted` | captions, small print |
| taupe | #A89F91 | `bg-taupe` | **brand taupe** – rules, fills, frames. **Never text/thin icons on light bg (2.5:1)** |
| taupe-text | #6E665A | `text-taupe-text` | taupe-coloured text on light bg (eyebrows, links) |
| taupe-light | #C9C2B7 | `text-taupe-light` | taupe text/icons on charcoal |
| dark | #2C2C2C | `bg-dark` | footer, Book CTA band |
| border | #E2DDD5 | `border-line` | hairlines (named `line` to avoid `border-border`) |

- Focus ring: 2px, 2px offset, charcoal; inside `.on-dark` it becomes taupe-light. Add `on-dark` to any charcoal section.
- Buttons (`.btn` + `.btn-primary | .btn-secondary | .btn-light | .btn-outline-light`): full pill, 16px/600, min 44px. One primary button per view. On photos/charcoal use `btn-light`.
- 12px corners on cards and images. No gradients except the scrim behind hero text. Taupe ≈10–15% of a screen.
- Type: h1 52/36px, h2 36/28px, h3 22px (Fraunces, sentence case). Body 17/28, `.intro` 20/32, `text-small` 14/22. `.eyebrow` = DM Sans 13px/600, uppercase, 0.16em, taupe-text.

## Content rules

- Warm, plain, friendly **British English**. Short sentences. Local, not luxury.
- **Never invent facts:** no prices, reviews, ratings, awards, staff, years at this address, or unlisted services.
- Missing facts show as a visible `<Confirm note="…" />` (renders `[CONFIRM: …]`). Keep a list of every placeholder.
- **Stock photos are not Rachel's work or salon.** Alt text describes the image only; never caption them as Rachel, the salon or "our work". Use them for the hero and services only, never before/after galleries.
- Real Rachel & Monty photos are 2:3 portrait – crop with `object-position` so faces stay in the upper third; never crop to landscape banners.
- Products: show **only Goldwell and Maria Nila**. Ignore the Wella / Paul Mitchell / Moroccanoil / ghd logos in Basecamp.
- NAP must be identical everywhere: "True Hairdressers", "75 Home Farm Crescent, Whitnash, Leamington Spa CV31 2QY" (`business.addressLine`).
- External links: `target="_blank" rel="noopener"` plus `<NewTab />` (visually hidden "opens in a new tab").
- Every image through `astro:assets` (`<Picture formats={['avif','webp']}>`), explicit sizes, `loading="lazy"` below the fold. Decorative images get `alt=""`.

## Targets

Lighthouse mobile ≥95 in all four categories; LCP < 2.0s, CLS < 0.05, INP < 200ms; WCAG 2.2 AA.

# True Hairdressers – website build brief

**Client:** Rachel, True Hairdressers (independent salon in Whitnash, Leamington Spa)
**Built by:** Rob Haggan, Peak SEO
**Domain:** `[CONFIRM: domain – and whether there's an existing site or DNS to move]`
**Stack:** Astro + TypeScript + Tailwind on Vercel, GitHub for the repo. **No CMS.** This is a small brochure site that rarely changes, so all content lives in one typed file (`src/content/site.ts`) that Rob edits. Same Astro/Vercel setup as the Biotex and Keep Calm builds, minus Sanity.

---

## 1. What we're building

A simple, warm, fast four-page website for a one-woman neighbourhood salon.

- **Business:** True Hairdressers, 75 Home Farm Crescent, Whitnash, Leamington Spa CV31 2QY
- **Owner/stylist:** Rachel – born and bred in Whitnash, qualified for 22 years, working in salons for 27
- **Booking:** online through Fresha (link out – no booking system on the site)
- **Shop mascot:** Monty the dog

The site has three jobs:

1. **Get people booked.** A "Book on Fresha" button is visible on every page, in the header and above the fold on mobile.
2. **Show who Rachel is.** Experience, Goldwell training and local roots are the reasons to choose her over a chain.
3. **Rank locally** for searches like "hairdresser Whitnash", "hairdressers Whitnash", "hair salon Leamington Spa", "hairdresser near me" (Whitnash/south Leamington), "colourist Leamington Spa" and "hair up Leamington Spa".

**Positioning:** Whitnash first, Leamington Spa second. "Your friendly local hairdresser in the heart of Whitnash."

---

## 2. Pages & URLs

Use trailing slashes throughout (`trailingSlash: 'always'`), with the www/apex choice confirmed at go-live and a 301 from the other.

| Page | URL | Notes |
| --- | --- | --- |
| Home | `/` | Hero, intro, services overview, about-Rachel teaser, Monty, products, hours + map, book CTA |
| Services | `/services/` | Each service with a short description; prices via Fresha |
| About | `/about/` | Rachel's story, experience, qualifications, Monty |
| Book | `/book/` | Fresha button, phone, hours, address, map, directions |
| 404 | – | Friendly, with Monty and links to the four pages |

Nav order: Home · Services · About · Book (Book styled as a button).

---

## 3. Design

### 3.1 Direction: "Warm neighbourhood salon"

Calm, light and welcoming – a salon you'd pop into on the parade, not a city-centre luxury brand. Lots of white space, warm off-white backgrounds, charcoal text and Rachel's warm taupe as the accent. Friendly rather than fancy. The photos of Rachel and Monty (soft autumn woodland, cream knit, chocolate-brown curls) sit naturally in this palette, so let them lead.

**There's no approved mockup for this one.** Build the homepage first and stop for Rob to review (see §9).

### 3.2 Design tokens

**Brand colours (from Rachel's Branding doc – use exactly):** taupe **#A89F91** and charcoal **#2C2C2C**. Everything else below is a tint or shade built around them.

| Token | Value | Use |
| --- | --- | --- |
| `bg` | #FAF8F5 | Page background (warm off-white) |
| `surface` | #FFFFFF | Cards |
| `surface-soft` | #EEEBE6 | Alternating sections (light taupe tint) |
| `ink` | #2C2C2C | **Brand charcoal.** Headings, body, primary buttons |
| `ink-muted` | #5F5A52 | Captions, small print (6.4:1 on `bg`) |
| `taupe` | #A89F91 | **Brand taupe.** Rules, icons, image frames, secondary button fills, large decorative shapes |
| `taupe-text` | #6E665A | Taupe-coloured text on light backgrounds – eyebrows, links (5.3:1 on `bg`) |
| `taupe-light` | #C9C2B7 | Taupe text/icons on charcoal (7.9:1) |
| `dark` | #2C2C2C | Footer and the dark Book CTA band |
| `border` | #E2DDD5 | Hairlines |
| `focus` | #2C2C2C (light) / #C9C2B7 (dark) | 2px focus ring, 2px offset |

**Contrast rules (checked):**
- `#A89F91` on white/off-white is only 2.5:1, so **never use brand taupe for text or thin icons on light backgrounds** – use `taupe-text` instead.
- Primary button: charcoal fill, white text (14:1). Hover: taupe fill, charcoal text (5.3:1).
- Secondary button: taupe outline with charcoal text.
- On charcoal sections, taupe (5.3:1) is fine for headings and large text; use `taupe-light` for small text.

Rules:
- Taupe covers roughly 10–15% of a screen. One primary button per view.
- Soft corners: 12px on cards and images, full pill on buttons.
- No gradients except a subtle scrim behind text on photos.

### 3.3 Typography (self-host with `@fontsource`, Latin subset)

- **Fraunces** 500/600 for headings (sentence case, not uppercase): h1 52px (36px mobile), h2 36px (28px mobile), h3 22px.
- **DM Sans** 400/500/600 for body, nav and buttons: body 17/28, intro 20/32, small 14/22. Buttons 16px, 600.
- Eyebrow labels: DM Sans 13px, 600, uppercase, 0.16em tracking, in `taupe-text` (`taupe-light` on charcoal).

### 3.4 Logo

`[CONFIRM: is there a logo?]` None is in Basecamp. Until one arrives, use a typographic wordmark: **True** in Fraunces 600 with "HAIRDRESSERS · WHITNASH" as a small tracked DM Sans line underneath. Build it as one `Logo` component so a real logo can be dropped in later.

### 3.5 Photography

There are two sets of photos:

**Real photos – Rachel and Monty** (Basecamp folder "Rachel and Monty" → `brief-assets/rachel-and-monty/`). These are professional portraits taken outdoors in autumn woodland. **Use these first and give them prominence** – they're the most personal, trust-building thing on the site.

| Basecamp file | What it is | Use |
| --- | --- | --- |
| `IMG-20261108-WA0003.jpg` | Close-up: Rachel smiling, holding Monty cheek to cheek (portrait) | Home "Born and bred in Whitnash" intro + About page hero |
| `IMG-20261108-WA0004.jpg` | Three-quarter length: Rachel holding Monty in woodland (portrait) | About page body / Book page |
| `IMG-20261108-WA0005.jpg` | Monty sitting alone on a leafy woodland path (portrait) | Monty card on Home + "Head of Client Happiness" section on About + 404 page |

- All three are portrait (2:3). Crop with `object-position` so faces aren't cut – keep Rachel's face and Monty's face in the upper third. Don't crop to landscape banners.
- Alt text examples: "Rachel, owner of True Hairdressers, holding her dog Monty" · "Monty, True Hairdressers' Head of Client Happiness, sitting on a woodland path".

**Stock photos** (Basecamp folder "Images" → `brief-assets/images/`). These are **not** Rachel's work or salon. So:
- Alt text describes what's in the image (e.g. "Stylist curling long blonde hair with tongs"). **Never** caption or alt-text a stock photo as Rachel, her salon or her work.
- Don't use stock photos as "before/after" or "our work" galleries.
- Use them for the hero and the service sections only.

Still missing: a photo of the salon front and inside (Book page). Use a soft `surface-soft` placeholder panel with a small label ("Photo of the salon coming soon") – tasteful, not broken-looking.

Process every image through `astro:assets` to AVIF/WebP with responsive `srcset`, explicit width/height and `loading="lazy"` below the fold. Stock PNGs are 1.5–4MB, so this matters.

**Stock image map:**

| Basecamp file | What it is | Use |
| --- | --- | --- |
| `True-Hairdressers.png` | Stylist curling blonde waves, salon mirror behind | Home hero |
| `True-Hairdressers-in-Whitnash.png` | Stylist sectioning hair, ring lights | Services hero or Book page |
| `True-1.png` | Bridal/occasion updo with hair vine | "Hair up" service |
| `Untitled-design-2025-07-09T142522.419.png` | Close-up of scissors cutting wet hair | Cutting services |
| `Untitled-design-2026-01-09T104750.837.png` | Long brunette balayage waves (portrait) | Colour services |
| `True.png` | Gold and black tools flat-lay on dark background | Optional Book CTA background – its gold tones may clash with the taupe palette, so a plain charcoal band is fine instead |
| `Untitled-design-2025-07-09T105234.094.png` | Unknown – couldn't be previewed | Look at it and use if it suits |
| `Untitled-design-2026-01-09T103106.080.png` | Goldwell logo | Products strip |
| `…103139.150.png`, `…103221.003.png`, `…103354.051.png`, `…103818.371.png` | Wella, Paul Mitchell, Moroccanoil, ghd logos | **Don't use** – see §5 |

### 3.6 Icons

Lucide line icons only, 1.5px stroke, in `taupe-text` or `ink` (or `taupe-light` on charcoal): scissors, palette, sparkles, wind (blow-dry), clock, map-pin, phone, calendar, paw-print, award. No emoji.

---

## 4. Components

- `Header`: logo (links home), nav, "Book now" pill button (→ Fresha, new tab). Sticky on mobile with a 44px menu toggle. On mobile, the Book button stays visible next to the toggle.
- `Hero`: photo with scrim, eyebrow, h1, intro, two buttons (Book on Fresha · See services).
- `SectionLabel`: eyebrow with a short taupe hairline.
- `ServiceCard`: icon, name, 1–2 lines, optional image.
- `AboutTeaser`: Rachel-and-Monty close-up (`WA0003`), short intro, "Meet Rachel →".
- `MontyCard`: Monty on the path (`WA0005`), "Monty – Head of Client Happiness", one cheeky line.
- `ProductStrip`: "We use and recommend" with the Goldwell logo and Maria Nila logo, greyscale, full colour on hover.
- `HoursTable`: all seven days, closed days shown as "Closed", today highlighted with a tiny inline script (Europe/London). Note the late night on Wednesday.
- `OpenNow` badge: "Open now · until 3pm" / "Closed · opens Wed 9am", computed client-side; without JS, show today's hours as text. Text plus colour, never colour alone.
- `MapEmbed`: click-to-load Google Maps iframe (placeholder image + "Show map" button until clicked) plus a "Get directions" link. No map JS on page load.
- `BookCTA`: dark band with the tools flat-lay, "Ready for a fresh look?", Book on Fresha button and phone number.
- `Footer`: dark; wordmark, address, phone, hours summary, Facebook + Instagram + Fresha links, © year, "Website by Peak SEO" (link to peakseo.co.uk).

---

## 5. Content (draft copy – keep it friendly and local)

**Content rules:**
- Warm, plain, friendly British English. Short sentences. Write like a local, not a luxury brand.
- **Never invent facts:** no prices, review quotes, star ratings, awards, staff, years of trading at this address, or services not listed below.
- Anything missing gets a visible `[CONFIRM: …]` placeholder. List every placeholder in your final summary.
- **Products:** Rachel's info says **Goldwell colour** and **Maria Nila** products. The Basecamp images folder also has Wella, Paul Mitchell, Moroccanoil and ghd logos, which may be left over from another job. **Only show Goldwell and Maria Nila.** The Maria Nila logo isn't in Basecamp – use the wordmark text in a matching style until Rob adds `brief-assets/images/maria-nila.png`.

### Facts to use

- Hairdressing qualified 22 years; worked in salons for 27 years
- Qualifications: NVQ Level 2 · Goldwell Creative Colour · Goldwell Creative Cutting · Goldwell Colour Masters
- Products: Goldwell colour · Maria Nila
- Services: Ladies' cutting · Gents' cuts · Creative cutting · Creative colour · Colouring · Blow-dries · Hair up
- Hours:

  | Day | Hours |
  | --- | --- |
  | Mon | Closed |
  | Tue | 09:00–15:00 |
  | Wed | 09:00–20:00 |
  | Thu | Closed |
  | Fri | 09:00–15:00 |
  | Sat | 09:00–15:00 |
  | Sun | Closed |

- Address: 75 Home Farm Crescent, Whitnash, Leamington Spa CV31 2QY
- Geo: 52.2690469, -1.5209224
- Phone: `[CONFIRM: salon phone number]`
- Email: `[CONFIRM: email – or leave off]`
- Fresha: https://www.fresha.com/en-GB/a/true-hairdressers-whitnash-royal-leamington-spa-home-farm-crescent-gyv2wyyx
- Facebook: https://www.facebook.com/Truehairdresserswhitnash/
- Instagram: https://www.instagram.com/truehairdressers/

### Home

- Eyebrow: WHITNASH · LEAMINGTON SPA
- H1: Your friendly local hairdresser in Whitnash
- Intro: Relaxed, expert hairdressing on Home Farm Crescent, from someone who's been doing hair for over 25 years – and who grew up just down the road.
- Buttons: Book on Fresha · See services
- Intro section (h2 "Born and bred in Whitnash"): I'm Rachel. I've lived in Whitnash all my life, and True is my little salon in the heart of the community. Whether you're after a quick trim, a brand-new colour or your hair up for a big day, you'll get an honest chat, a cuppa `[CONFIRM: offer drinks?]` and hair you'll love. Monty will probably say hello too.
- Services overview (h2 "What I do"): four cards linking to `/services/` – Cutting (ladies', gents' and creative), Colour (Goldwell colour, creative colour), Blow-dries, Hair up.
- Experience strip: "22 years qualified · 27 years in salons · Goldwell-trained colourist"
- Monty card: "Meet Monty, our Head of Client Happiness. He takes his job very seriously."
- Products strip: "We use and recommend Goldwell and Maria Nila."
- Hours + map (h2 "Find us"): hours table, open-now badge, address, map, directions link. Mention: "Late appointments until 8pm on Wednesdays."
- Book CTA band.

### Services

- H1: Hair services in Whitnash
- Intro: Everything from a tidy-up to a total transformation, all done by Rachel using professional Goldwell colour. Prices and availability are on Fresha, where you can book in a couple of taps.
- Sections (each h2 with 2–3 lines, no prices):
  - **Ladies' cutting** – Cuts tailored to your hair, your face shape and how much time you want to spend styling it.
  - **Gents' cuts** – Smart, simple cuts for men, done properly.
  - **Creative cutting** – Something new? Goldwell creative cutting training means Rachel can take you somewhere different, from a restyle to a bold change.
  - **Colouring** – Root touch-ups, all-over colour and grey coverage with Goldwell colour.
  - **Creative colour** – Highlights, lowlights and more creative colour work, backed by Goldwell Creative Colour and Colour Masters training. `[CONFIRM: specific techniques offered, e.g. balayage, foils, toners – list only what Rachel confirms]`
  - **Blow-dries** – A salon-fresh finish for a night out, an event or just because.
  - **Hair up** – Weddings, proms, parties and special occasions. `[CONFIRM: does Rachel do bridal/wedding-morning hair, trials or travel?]`
- Colour note: `[CONFIRM: patch/skin test policy for colour clients]` – show as a small info box once confirmed.
- CTA: "See prices and book on Fresha".

### About

- H1: About Rachel
- Body:
  - I was born and bred in Whitnash, so True really is my local salon as much as yours.
  - I've worked in salons for 27 years and have been a qualified hairdresser for 22. Along the way I've trained with Goldwell in creative colour, creative cutting and their Colour Masters programme, so you're in experienced hands whether you want a simple trim or something completely new.
  - I opened True `[CONFIRM: year opened]` to give Whitnash a friendly, relaxed salon where you're treated like a neighbour, not a number.
- Qualifications list (with award icon): NVQ Level 2 in Hairdressing · Goldwell Creative Colour · Goldwell Creative Cutting · Goldwell Colour Masters
- Products: Goldwell colour and Maria Nila care and styling products – "chosen because they work and they're kind to your hair". `[CONFIRM: Maria Nila is vegan/cruelty-free – only mention if Rachel wants that angle]`
- Monty section (h2 "Monty, Head of Client Happiness"): Every good salon needs a manager, and ours has four paws. Monty's in charge of greetings, moral support and checking everyone's happy with their new look. `[CONFIRM: is Monty in the salon most days? breed?]`
- CTA: Book on Fresha.

### Book

- H1: Book your appointment
- Intro: The easiest way to book is online with Fresha – you can see every service, price and free slot, and get reminders before your appointment.
- Big "Book on Fresha" button (new tab, `rel="noopener"`).
- "Prefer to call?" with the phone number as a `tel:` link.
- Hours table + open-now badge.
- Address, map, "Get directions", and a short line: "You'll find us on the Home Farm Crescent shops in Whitnash." `[CONFIRM: parking – is there free parking outside the parade?]`
- Facebook and Instagram links: "Follow along for new looks and last-minute slots."

---

## 6. SEO

### 6.1 Titles & descriptions

| Page | Title | Meta description |
| --- | --- | --- |
| Home | True Hairdressers \| Hairdresser in Whitnash, Leamington Spa | Friendly local hairdresser on Home Farm Crescent, Whitnash. Cuts, colour, blow-dries and hair up by Goldwell-trained Rachel. Book online with Fresha. |
| Services | Hair Services in Whitnash \| Cuts, Colour & Hair Up \| True Hairdressers | Ladies' and gents' cuts, Goldwell colour, creative colour, blow-dries and hair up in Whitnash, Leamington Spa. See prices and book online. |
| About | About Rachel \| Whitnash Hairdresser with 27 Years' Experience \| True | Born and bred in Whitnash, Rachel has 27 years in salons and Goldwell colour and cutting training. Meet her – and Monty, Head of Client Happiness. |
| Book | Book a Hair Appointment in Whitnash \| True Hairdressers | Book your cut, colour or blow-dry at True Hairdressers, 75 Home Farm Crescent, Whitnash. Online booking with Fresha, opening hours and directions. |

Keep titles under ~60 characters where possible and descriptions 140–160; trim if they run long.

### 6.2 Technical

- One `h1` per page, logical heading order, `lang="en-GB"`.
- Canonical URL, Open Graph and Twitter tags on every page, with a 1200×630 sharing image (hero photo + wordmark).
- `@astrojs/sitemap`; `robots.txt` pointing to it. 404 excluded.
- Every image has descriptive alt text (see §3.5). Decorative images get `alt=""`.
- **Name, address and phone (NAP) must be identical everywhere** – site, schema, footer and Google Business Profile. Use "True Hairdressers" and "75 Home Farm Crescent, Whitnash, Leamington Spa CV31 2QY". Note: the Google Maps listing currently shows the name as "TRUE" – flag in the summary for Rob.
- Breadcrumbs on Services, About and Book (visible + `BreadcrumbList`).

### 6.3 Structured data (JSON-LD)

- **Sitewide:** `HairSalon` with name, url, logo/image, telephone, address (`PostalAddress`, addressLocality "Whitnash", addressRegion "Warwickshire", postalCode "CV31 2QY", addressCountry "GB"), geo, `openingHoursSpecification` (from §5), `areaServed` (Whitnash, Leamington Spa, Warwick), `sameAs` (Facebook, Instagram, Fresha), and `potentialAction` `ReserveAction` pointing to Fresha.
- **About:** `Person` (Rachel, `jobTitle` "Hairdresser and owner", `worksFor` the HairSalon, `hasCredential` for each qualification). `[CONFIRM: Rachel's surname, if she wants it used]`
- **Services:** `OfferCatalog` / `hasOfferCatalog` on the HairSalon listing each service by name (no prices).
- No `AggregateRating` or `Review` markup – we have no reviews on the site.
- Validate with the Rich Results Test and Schema.org validator before launch.

### 6.4 Internal linking

- Home → each service section (`/services/#colour` etc.), About, Book.
- Services → About ("trained by Goldwell – meet Rachel"), Book.
- About → Services, Book.
- Every page → Book, in the header and the closing CTA.
- Use descriptive anchors ("hair colour in Whitnash", "meet Rachel"), not "click here".

---

## 7. Performance & accessibility

- **Lighthouse (mobile):** ≥95 in all four categories on every page.
- **Core Web Vitals:** LCP < 2.0s, CLS < 0.05, INP < 200ms.
- **JavaScript is limited to:** the mobile nav toggle, the open-now/today-highlight script and the click-to-load map. Everything else is static HTML.
- Preload the hero image and the Fraunces 600 font file.
- **Accessibility:** WCAG 2.2 AA – skip link, visible focus rings, 44px tap targets, real links/buttons, contrast checked (see §3.2 – brand taupe never used for small text on light backgrounds), external links say they open in a new tab (visually hidden text).
- Respect `prefers-reduced-motion`. No sliders, carousels or animation libraries.

---

## 8. Analytics

Vercel Web Analytics and Speed Insights (cookieless, so no cookie banner). Track clicks on the Fresha button and `tel:` link as custom events so Rob can show Rachel how many bookings the site sends.

---

## 9. Build order

1. Scaffold Astro + TypeScript + Tailwind + `@astrojs/vercel` + `@astrojs/sitemap`. Set `site` (placeholder until domain confirmed) and `trailingSlash: 'always'`.
2. Create `src/content/site.ts` holding every fact in §5 (NAP, hours, links, services, qualifications) – one source of truth used by pages, footer and schema.
3. Add design tokens as CSS variables + Tailwind theme, self-hosted fonts, base layout (SEO head + JSON-LD), Header, Footer, Logo.
4. Process `brief-assets/images/` into `src/assets/` with sensible names.
5. Build the homepage. **Stop here so Rob can review the design.**
6. Build Services, About, Book and the 404.
7. Add breadcrumbs, structured data, OG images, sitemap, robots.txt; validate.
8. Run `astro check`, a production build and Lighthouse. Fix anything below target.
9. Push to GitHub and import into Vercel; check the preview deploy.
10. **Go live (Rob):** add the domain in Vercel, update DNS (note any existing MX records first so email isn't affected), turn on Web Analytics and Speed Insights.
11. **After launch (Rob):** Search Console + Bing Webmaster (submit sitemap); update the Google Business Profile website link to the new site and align the name with "True Hairdressers"; add the website link to Fresha, Facebook and Instagram; set up local rank tracking for the §1 keywords.

---

## 10. Open questions for Rachel (show as `[CONFIRM]` until answered)

1. Salon phone number (and email, if she wants one shown).
2. Domain name – and is there an existing website or domain?
3. A logo, or happy with the typographic wordmark?
4. Photos: the salon front and inside, and some of her own work (with client permission). Rachel and Monty are covered.
5. Maria Nila logo file – and are Wella, Paul Mitchell, Moroccanoil or ghd used too, or were those logos added by mistake?
6. Which creative colour techniques she offers (balayage, foils, toners, etc.).
7. Does she do bridal/wedding-morning hair, trials or mobile visits?
8. Patch/skin test policy for colour.
9. Year True opened, and whether to use her surname.
10. Parking details, and whether she offers drinks.
11. Monty's breed, and is he in most days? (Useful for anyone with allergies.)

---

## How to use this brief in Claude Code

1. Create an empty GitHub repo (e.g. `true-hairdressers`) and add this file to the root as `BRIEF.md`.
2. From the True Hairdressers Website project in Basecamp, download the "Rachel and Monty" folder into `brief-assets/rachel-and-monty/` and the "Images" folder into `brief-assets/images/`.
3. Go to claude.ai/code, pick the repo, and prompt:

> Read BRIEF.md and everything in brief-assets/. First give me a short build plan and create a CLAUDE.md summarising the stack, design tokens and content rules. Then build in the order in §9, pausing after step 5 so I can review the homepage.

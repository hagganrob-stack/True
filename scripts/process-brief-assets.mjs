// Converts the Basecamp source images in brief-assets/ into src/assets/ with sensible names.
// Stock PNGs (1.5-4MB) become high-quality JPEG masters; astro:assets then makes AVIF/WebP at build.
// Run: node scripts/process-brief-assets.mjs
import sharp from 'sharp';
import { copyFile } from 'node:fs/promises';
const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const jobs = [
  ['rachel-and-monty/IMG-20261108-WA0003.jpg', 'photos/rachel-monty-closeup.jpg'],
  ['rachel-and-monty/IMG-20261108-WA0004.jpg', 'photos/rachel-monty-woodland.jpg'],
  ['rachel-and-monty/IMG-20261108-WA0005.jpg', 'photos/monty-woodland-path.jpg'],
  ['images/True-Hairdressers.png', 'stock/stylist-curling-blonde-waves.jpg'],
  ['images/True-Hairdressers-in-Whitnash.png', 'stock/stylist-sectioning-hair.jpg'],
  ['images/True-1.png', 'stock/occasion-updo-hair-vine.jpg'],
  ['images/Untitled-design-2025-07-09T142522.419.png', 'stock/scissors-cutting-wet-hair.jpg'],
  ['images/Untitled-design-2026-01-09T104750.837.png', 'stock/brunette-balayage-waves.jpg'],
  ['images/True.png', 'stock/hair-tools-flatlay.jpg'],
];
for (const [src, out] of jobs) {
  if (src.startsWith('rachel')) {
    // Real photos are already small JPEGs: copy as-is so no quality is lost.
    await copyFile(`${root}/brief-assets/${src}`, `${root}/src/assets/${out}`);
    continue;
  }
  await sharp(`${root}/brief-assets/${src}`).flatten({ background: '#ffffff' }).jpeg({ quality: 88, mozjpeg: true }).toFile(`${root}/src/assets/${out}`);
}
await sharp(`${root}/brief-assets/images/Untitled-design-2026-01-09T103106.080.png`).trim().png().toFile(`${root}/src/assets/logos/goldwell.png`);

// Logo (supplied separately, Nov 2026): full stacked logo + the circle "T" mark.
await sharp(`${root}/brief-assets/logo/true-logo.png`).trim().toFile(`${root}/src/assets/logos/true-logo.png`);
const top = await sharp(`${root}/brief-assets/logo/true-logo.png`).extract({ left: 0, top: 0, width: 268, height: 250 }).png().toBuffer();
await sharp(top).trim().toFile(`${root}/src/assets/logos/true-mark.png`);
await sharp(`${root}/src/assets/logos/true-mark.png`).resize(64, 64).png().toFile(`${root}/public/favicon.png`);
await sharp(`${root}/src/assets/logos/true-mark.png`)
  .resize(160, 160)
  .extend({ top: 10, bottom: 10, left: 10, right: 10, background: '#FAF8F5' })
  .flatten({ background: '#FAF8F5' })
  .png()
  .toFile(`${root}/public/apple-touch-icon.png`);

// Salon photos (from Rachel's Fresha listing, Nov 2026). Crop the top strip
// to remove the small "fresha" watermark in the top-left corner.
for (const [src, out, top] of [
  ['salon/fresha-salon-seating.avif', 'photos/salon-seating.jpg', 34],
  ['salon/fresha-salon-styling-stations.avif', 'photos/salon-styling-stations.jpg', 48],
]) {
  const img = sharp(`${root}/brief-assets/${src}`);
  const { width, height } = await img.metadata();
  await img
    .extract({ left: 0, top, width, height: height - top })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(`${root}/src/assets/${out}`);
}

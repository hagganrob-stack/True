// Renders public/og-image.jpg (1200×630): hero photo + True logo + wordmark.
// Uses the real Fraunces / DM Sans files so it matches the site.
// Run: node scripts/make-og-image.cjs   (needs Playwright + Chromium installed)
const { chromium } = require('playwright');
const path = require('node:path');
const fs = require('node:fs');

const root = path.resolve(__dirname, '..');
const b64 = (p) => fs.readFileSync(path.join(root, p)).toString('base64');
const font = (p) => `url(data:font/woff2;base64,${b64(p)}) format('woff2')`;

const html = `<!doctype html><html><head><style>
@font-face { font-family: Fraunces; font-weight: 600; src: ${font('node_modules/@fontsource/fraunces/files/fraunces-latin-600-normal.woff2')}; }
@font-face { font-family: 'DM Sans'; font-weight: 600; src: ${font('node_modules/@fontsource/dm-sans/files/dm-sans-latin-600-normal.woff2')}; }
@font-face { font-family: 'DM Sans'; font-weight: 400; src: ${font('node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2')}; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; position: relative; overflow: hidden; background: #2C2C2C; }
.photo { position: absolute; inset: 0; background: url(data:image/jpeg;base64,${b64('src/assets/stock/stylist-curling-blonde-waves.jpg')}) 75% 35% / cover; }
.scrim { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(44,44,44,.94) 0%, rgba(44,44,44,.82) 42%, rgba(44,44,44,.15) 75%); }
.content { position: absolute; left: 80px; top: 0; bottom: 0; display: flex; flex-direction: column; justify-content: center; width: 620px; color: #fff; }
.mark { width: 104px; height: 104px; }
.eyebrow { margin-top: 36px; font: 600 18px 'DM Sans'; letter-spacing: .16em; text-transform: uppercase; color: #C9C2B7; }
h1 { margin-top: 14px; font: 600 64px/1.05 Fraunces; letter-spacing: -.01em; }
p { margin-top: 20px; font: 400 26px/1.4 'DM Sans'; color: rgba(255,255,255,.9); text-wrap: balance; }
.rule { margin-top: 32px; width: 64px; height: 3px; background: #A89F91; }
</style></head><body>
<div class="photo"></div><div class="scrim"></div>
<div class="content">
  <img class="mark" src="data:image/png;base64,${b64('src/assets/logos/true-mark.png')}" alt="">
  <div class="eyebrow">Whitnash · Leamington Spa</div>
  <h1>True Hairdressers</h1>
  <p>Your friendly local hairdresser in the heart of Whitnash</p>
  <div class="rule"></div>
</div>
</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, 'public/og-image.jpg'), type: 'jpeg', quality: 85 });
  await browser.close();
  console.log('Wrote public/og-image.jpg');
})();

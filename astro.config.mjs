// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE_URL } from './src/content/site.ts';

export default defineConfig({
  // Placeholder until the domain is confirmed – change SITE_URL in src/content/site.ts.
  site: SITE_URL,
  trailingSlash: 'always',
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  image: {
    responsiveStyles: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

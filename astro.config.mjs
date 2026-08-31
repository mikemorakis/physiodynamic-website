import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://physiodynamic.com.gr',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Inline all CSS into the HTML — removes render-blocking stylesheet requests
    // (biggest FCP/LCP win on mobile).
    inlineStylesheets: 'always',
  },
  integrations: [sitemap()],
  vite: {
    ssr: {
      external: ['resend'],
    },
  },
});

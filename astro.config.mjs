import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://physiodynamic.com.gr',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [sitemap(), icon()],
  vite: {
    ssr: {
      external: ['resend'],
    },
  },
});

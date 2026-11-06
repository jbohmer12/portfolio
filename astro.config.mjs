import { defineConfig } from 'astro/config';

// Canonical URL (used for OG tags). Swap for a custom domain later.
export default defineConfig({
  site: 'https://joaquinbohmer.netlify.app',
  vite: { build: { chunkSizeWarningLimit: 800 } },
});

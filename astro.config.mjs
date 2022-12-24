import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://derrickp.ca',
	integrations: [mdx(), sitemap()],
	server: { port: 8000 }
});

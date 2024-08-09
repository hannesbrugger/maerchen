import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), tailwind(), react()],
  trailingSlash: "never",
  build: {
    rollupOptions: {
      external: ['markdown-it', 'sanitize-html'], // Hier werden markdown-it und sanitize-html als extern deklariert
    },
  },
  output: 'hybrid',
  // experimental: {
  //   env: {
  //     schema: {
  //       MailerAPI: envField.string({
  //         context: 'server',
  //         access: 'secret',
  //       }),
  //       SUPABASE_URL: envField.string({
  //         context: 'server',
  //         access: 'secret',
  //       }),
  //       SUPABASE_ANON_KEY: envField.string({
  //         context: 'server',
  //         access: 'secret',
  //       }),
  //     }
  //   }
  // }
});
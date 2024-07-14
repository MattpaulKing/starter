import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { kitRoutes } from "vite-plugin-kit-routes"
import type { KIT_ROUTES } from '$lib/ROUTES';

export default defineConfig({
  plugins: [
    sveltekit(),
    purgeCss(),
    kitRoutes<KIT_ROUTES>({
      PAGES: {},
      SERVERS: {},
      ACTIONS: {}
    })
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});

import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import * as child_process from "node:child_process"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte'],
  preprocess: [vitePreprocess()],
  kit: {
    version: {
      name: child_process.execSync('git rev-parse HEAD').toString().trim(),
      pollInterval: 420000,
    },
    adapter: adapter(),
    alias: {
      "$routes": "./src/routes"
    },
    csp: {
      directives: {
        'object-src': ['self'],
        "base-uri": ['self'],
        'script-src': ['self'],
      },
      mode: 'nonce'
    },
    csrf: {
      checkOrigin: true
    },
    serviceWorker: {
      register: false
    }
  }
};
export default config;

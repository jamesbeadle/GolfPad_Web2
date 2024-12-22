import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      env: {
        host: '0.0.0.0',
        port: process.env.PORT || 8080
      }
    })
  }
};

export default config;

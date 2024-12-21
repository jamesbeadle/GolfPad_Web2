import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      out: 'build' // or any directory you like
      // If you want SvelteKit to automatically read PORT, see "envPrefix" below
      // envPrefix: 'PORT'
    })
  }
};

export default config;

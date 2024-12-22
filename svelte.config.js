import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      out: 'build',
      // This ensures the built server reads `PORT` from environment
      env: {
        host: '0.0.0.0',


                port: process.env.PORT || 8080


      }
    })
  }
};

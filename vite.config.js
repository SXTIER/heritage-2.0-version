import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      mangle: {
        toplevel: true,
      },
    },
  },
});

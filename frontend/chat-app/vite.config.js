// import { defineConfig } from 'vite';
// import { nodePolyfills } from 'vite-plugin-node-polyfills'; // Use named import
// // import React from 'react';
// export default defineConfig({
//   plugins: [
//     nodePolyfills(),
//   ],
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      // Required for some packages to work properly in browser
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      sys: 'util',
      events: 'rollup-plugin-node-polyfills/polyfills/events',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      path: 'rollup-plugin-node-polyfills/polyfills/path',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
    },
  },
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
});




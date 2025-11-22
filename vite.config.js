// vite.config.js

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // **WICHTIG:** Auf strikt relativen Pfad setzen (Fix für GitHub Pages Asset 404s/MIME-Fehler)
  base: './', 
  
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        resources: resolve(__dirname, 'resources.html'),
      },
    },
    assetsDir: 'assets',
    outDir: 'dist',
  },
});
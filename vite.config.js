// vite.config.js

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/tuhh-agent-repo/',
  
  build: {
    rollupOptions: {
      input: {
        // Haupteinstiegsseite (Repository Liste)
        main: resolve(__dirname, 'index.html'),
        // Zweite Seite (Projects)
        projects: resolve(__dirname, 'projects.html'),
        // Dritte Seite (Resources)
        resources: resolve(__dirname, 'resources.html'),
      },
      // Stellt sicher, dass alle Assets relativ zum 'base' Pfad geladen werden
      assetsDir: 'assets',
    },
    // Zielordner für das Build-Ergebnis
    outDir: 'dist',
  },
});
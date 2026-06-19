/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Pre-alpha build setup. Plain Vite + React, no extra tooling needed.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: false },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

// base relativo: o mesmo build funciona no dominio proprio (conheca.ariuno.com.br)
// e na URL de subpasta do GitHub Pages (projetos.75lab.com.br/ariuno-site/).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    assetsInlineLimit: 2048,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        privacidade: resolve(__dirname, 'privacidade.html'),
        '404': resolve(__dirname, '404.html'),
      },
    },
  },
});

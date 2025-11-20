// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: './',                    // এটাই ম্যাজিক! Netlify-তে ছবি + CSS + JS ১০০% দেখাবে
  build: {
    outDir: 'dist',              // Vite ডিফল্টই dist করে, কিন্তু লিখে দিলে সেফ
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  }
})
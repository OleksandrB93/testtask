import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          form: ["react-hook-form", "@hookform/resolvers", "zod"],
          query: ["@tanstack/react-query"],
          utils: ["axios"],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable source maps for better debugging
    sourcemap: false,
    // Optimize for Core Web Vitals
    target: "es2015",
    minify: "esbuild",
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "react-hook-form", "@tanstack/react-query"],
  },
  // Performance optimizations
  server: {
    // HTTP/2 is handled by the server, not Vite config
  },
  // CSS optimizations
  css: {
    devSourcemap: false,
  },
});

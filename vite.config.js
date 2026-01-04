/* eslint-disable no-undef */
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk size
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core vendor libraries
          vendor: ["react", "react-dom"],
          // Router
          router: ["react-router"],
          // Firebase (large library)
          firebase: ["firebase/app", "firebase/auth"],
          // Charts (large library)
          charts: ["recharts"],
          // Query management
          query: ["@tanstack/react-query"],
          // UI utilities
          ui: [
            "lucide-react",
            "class-variance-authority",
            "clsx",
            "tailwind-merge",
          ],
        },
      },
    },
  },
  // Optimize dev server
  server: {
    hmr: {
      overlay: true,
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    watch: {
      ignored: ["**/*.mp4", "**/*.webm", "**/*.mov", "**/*.mkv"],
    },
  },
  build: {
    target: "esnext",
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
  },
});

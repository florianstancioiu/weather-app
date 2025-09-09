/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  base: "/weather-app/",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.js"],
  },
});

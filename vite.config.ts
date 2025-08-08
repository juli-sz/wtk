import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";


// https://vite.dev/config/
export default defineConfig({
  base: 'https://juli-sz.github.io/prueba-ic-wtk/',
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts"
  }
});

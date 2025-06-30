import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
    "@": path.resolve(__dirname, "./src"),
    Components: path.resolve(__dirname, ".src/com"),
    ui: path.resolve(__dirname, "./src/Components/ui"),
    lib: path.resolve(__dirname, "./src/lib"),
    utils: path.resolve(__dirname, "./src/lib/utils"),
    hooks: path.resolve(__dirname, "./src/hooks"),
  },
  },
})

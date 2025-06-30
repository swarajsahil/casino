import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/",
  resolve: {
    alias: {
    "@": path.resolve(__dirname, "./src"),
    components: path.resolve(__dirname, ".src/components"),
    ui: path.resolve(__dirname, "./src/components/ui"),
    lib: path.resolve(__dirname, "./src/lib"),
    utils: path.resolve(__dirname, "./src/lib/utils"),
    hooks: path.resolve(__dirname, "./src/hooks"),
  },
  },
})

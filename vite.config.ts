import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"

const app = process.env.APP || "war-theatre"

export default defineConfig({
  root: app === "war-theatre" ? "src/ui" : `src/${app}/ui`,
  plugins: [react()],
  css: {
    postcss: path.resolve(__dirname, "postcss.config.js"),
  },
  resolve: {
    alias: {
      "@": path.resolve(
        __dirname,
        app === "war-theatre" ? "src/ui" : `src/${app}/ui`
      ),
    },
  },
  server: {
    port:
      {
        "through-the-veil": 5173,
        "veil-and-virtue": 5174,
        "war-theatre": 5175,
      }[app] || 5173,
  },
})

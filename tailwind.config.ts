import { defineConfig } from "windicss/helpers";
import formsPlugin from "windicss/plugin/forms";

export default defineConfig({
  darkMode: "class",
  plugins: [formsPlugin],
  extract: {
    include: ["src/**/*.{vue,html,jsx,tsx}"],
    exclude: ["node_modules", ".git"],
  },
});

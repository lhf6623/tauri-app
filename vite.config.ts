import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Unocss from "unocss/vite";
import { presetAttributify, presetUno } from "unocss";
import presetIcons from "@unocss/preset-icons";

const getAlias = (dir: string) => resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Unocss({
      presets: [
        presetAttributify({}),
        presetUno(),
        presetIcons({
          prefix: "i-",
          extraProperties: {
            display: "inline-block",
            "vertical-align": "middle",
            // ...
          },
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      "/@": getAlias("./src/"),
      "/#": getAlias("./types/"),
      "/@xiang": getAlias("./src/views/xiang/"),
      "/@mirror": getAlias("./src/views/mirror/"),
      "/@life": getAlias("./src/views/life/"),
    },
  },
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // Tauri expects a fixed port, fail if that port is not available
  server: {
    port: 3000,
    strictPort: true,
    host: true,
  },
  // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
  // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
  // env variables
  envPrefix: ["VITE_", "TAURI_"],
  root: resolve(__dirname, "src/views"),
  base: "/",
  build: {
    rollupOptions: {
      input: {
        xiang: resolve(__dirname, "src/views/xiang/index.html"),
        mirror: resolve(__dirname, "src/views/mirror/index.html"),
        life: resolve(__dirname, "src/views/life/index.html"),
      },
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    // Tauri supports es2021
    target: ["es2021", "chrome97", "safari13"],
    // don't minify for debug builds
    minify: "esbuild",
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
    outDir: getAlias("dist"),
    assetsDir: "assets",
    emptyOutDir: true,
  },
});

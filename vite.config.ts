import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Unocss from "unocss/vite";
import { presetAttributify, presetUno } from "unocss";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Unocss({
      presets: [presetAttributify({}), presetUno()],
    }),
  ],
  resolve: {
    alias: [
      // @/xxxx => src/xxxx
      {
        find: /@\//,
        replacement: pathResolve("src") + "/",
      },
    ],
  },
  server: {
    host: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  build: {
    rollupOptions: {
      input: [
        resolve(__dirname, "index.html"),
        resolve(__dirname, "splashscreen.html"),
      ],
    },
  },
});

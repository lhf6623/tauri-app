import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import WindiCSS from "vite-plugin-windicss";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS()],

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
});

import { defineStore } from "pinia";
import { store } from "/@/store";
import { MirrorStoreType } from "/#/Mirror";
import { appWindow } from "@tauri-apps/api/window";
import { version_key } from "/@/utils/version";

export const useMirrorStore = defineStore("mirror", {
  state: (): MirrorStoreType => ({
    mirrorIsOpen: false,
    mirrorWindow: null,
  }),
  actions: {
    initWindow() {
      this.mirrorIsOpen = true;
      appWindow.onCloseRequested(() => {
        this.mirrorIsOpen = false;
      });
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: version_key,
        storage: localStorage,
        paths: ["mirrorIsOpen"],
      },
    ],
  },
});

export function useMirrorStoreWithOut() {
  return useMirrorStore(store);
}

import { WebviewWindow } from "@tauri-apps/api/window";
export type MirrorStoreType = {
  mirrorIsOpen: boolean;
  mirrorWindow: WebviewWindow | null;
};

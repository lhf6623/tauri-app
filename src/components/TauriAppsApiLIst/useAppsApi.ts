import { getName, getTauriVersion, getVersion } from "@tauri-apps/api/app";
import {
  EOL,
  arch,
  platform,
  tempdir,
  type,
  version,
} from "@tauri-apps/api/os";
import { ref, Ref } from "vue-demi";

export const useAppInfo = (): Ref<AppInfo> => {
  let appInfo = ref<AppInfo>({});
  getName().then((name) => {
    appInfo.value.name = name;
  });
  getTauriVersion().then((tauriVersion) => {
    appInfo.value.tauriVersion = tauriVersion;
  });
  getVersion().then((version) => {
    appInfo.value.version = version;
  });

  return appInfo;
};

export const uasOSInfo = (): Ref<OsInfo> => {
  let osInfo = ref<OsInfo>({
    EOL: JSON.stringify(EOL),
  });
  arch().then((res) => {
    osInfo.value.arch = res;
  });
  platform().then((res) => {
    osInfo.value.platform = res;
  });
  tempdir().then((res) => {
    osInfo.value.tempdir = res;
  });
  type().then((res) => {
    osInfo.value.type = res;
  });
  version().then((res) => {
    osInfo.value.version = res;
  });

  return osInfo;
};

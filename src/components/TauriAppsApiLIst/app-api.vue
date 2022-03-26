<template>
  <div class="shadow mb-1 pb-1">
    <h1 class="font-bold pb-2">App：获取应用程序元数据。</h1>
    <p class="flex justify-around">
      <span>{{ `${appInfo.name || ""}` }}</span>
      <span class="ml-2">{{ appInfo.version || "" }}</span>
      <span class="ml-2">Tauri：{{ appInfo.tauriVersion || "" }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { getName, getTauriVersion, getVersion } from "@tauri-apps/api/app";
import { computed, reactive } from "vue";

const appInfo = computed(() => {
  let info = reactive<AppInfo>({});
  getName().then((name) => {
    info.name = name;
  });
  getTauriVersion().then((tauriVersion) => {
    info.tauriVersion = tauriVersion;
  });
  getVersion().then((version) => {
    info.version = version;
  });

  return info;
});
</script>

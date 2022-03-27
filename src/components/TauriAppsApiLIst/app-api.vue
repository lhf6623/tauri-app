<template>
  <CustomCard title="App：获取应用程序信息">
    <p>应用名称：{{ appInfo.name }}</p>
    <p>应用版本：{{ appInfo.version }}</p>
    <p>Tauri版本：{{ appInfo.tauriVersion }}</p>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from "./components/custom-card.vue";
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

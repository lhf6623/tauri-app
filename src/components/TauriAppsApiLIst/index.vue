<template>
  <div class="m-2">
    <p>
      <span>{{ `${appInfo.name || ""}` }}</span>
      <span class="ml-2">版本：{{ appInfo.version || "" }}</span>
      <span class="ml-2">Tauri：{{ appInfo.tauriVersion || "" }}</span>
    </p>
    <p>
      <span>{{ `${osInfo.type || ""}` }}</span>
      <span class="ml-2">{{ osInfo.version || "" }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { getMatches } from "@tauri-apps/api/cli";
import { onMounted } from "vue";
import { useAppInfo, uasOSInfo } from "./useAppsApi";
let appInfo = useAppInfo();
let osInfo = uasOSInfo();

onMounted(async () => {
  let a = await getMatches();
  console.log(`🚀 ~ a`, a);
});
</script>

<template>
  <p>
    <span>{{ `${appInfo.name}` }}</span>
    <span class="ml-2">版本：{{ appInfo.version }}</span>
    <span class="ml-2">Tauri：{{ appInfo.tauriVersion }}</span>
  </p>
  <p>
    <span>{{ `${osInfo.type}` }}</span>
    <span class="ml-2">{{ osInfo.arch }}</span>
    <span class="ml-2">{{ osInfo.version }}</span>
  </p>
</template>

<script setup lang="ts">
import { useAppInfo, uasOSInfo } from "./useAppsApi";
let appInfo = useAppInfo();
let osInfo = uasOSInfo();
</script>

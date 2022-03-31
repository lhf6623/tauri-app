<template>
  <NConfigProvider abstract :theme="theme">
    <NGlobalStyle v-if="false" />
    <XiangqiMap />
    <TauriAppsApiLIst />
  </NConfigProvider>
</template>
<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, darkTheme, useOsTheme } from "naive-ui";
import XiangqiMap from "@/views/Xiangqi/index.vue";
import TauriAppsApiLIst from "@/views/TauriAppsApiLIst/index.vue";
import { computed } from "vue";

const osThemeRef = useOsTheme();
const theme = computed(() => {
  const isDark = osThemeRef.value === "dark";
  document.documentElement.classList.add(isDark ? "dark" : "light");
  return isDark ? darkTheme : null;
});
</script>

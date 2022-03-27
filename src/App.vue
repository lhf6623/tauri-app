<template>
  <NConfigProvider abstract :theme="theme">
    <NGlobalStyle />
    <XiangqiMap v-if="false" />
    <TauriAppsApiLIst />
  </NConfigProvider>
</template>
<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, darkTheme, useOsTheme } from "naive-ui";
import XiangqiMap from "@/components/Xiangqi/index.vue";
import TauriAppsApiLIst from "@/components/TauriAppsApiLIst/index.vue";
import { computed } from "vue";

const osThemeRef = useOsTheme();
const theme = computed(() => {
  const isDark = osThemeRef.value === "dark";
  document.documentElement.classList.add(isDark ? "dark" : "light");
  return isDark ? darkTheme : null;
});
</script>

<template>
  <NConfigProvider abstract :theme="theme">
    <NGlobalStyle />
    <XiangqiMap v-if="isXiangqi" />
    <TauriAppsApiLIst v-else />
  </NConfigProvider>
</template>
<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, darkTheme, useOsTheme } from "naive-ui";
import XiangqiMap from "@/views/Xiangqi/index.vue";
import TauriAppsApiLIst from "@/views/TauriAppsApiLIst/index.vue";
import { computed, ref } from "vue";

const osThemeRef = useOsTheme();
const theme = computed(() => {
  const isDark = osThemeRef.value === "dark";
  document.documentElement.classList.add(isDark ? "dark" : "light");
  return isDark ? darkTheme : null;
});

const isXiangqi = ref(true);
</script>

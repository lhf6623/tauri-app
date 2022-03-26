<template>
  <NConfigProvider abstract>
    <NGlobalStyle />
    <XiangqiMap v-if="false" />
    <TauriAppsApiLIst />
  </NConfigProvider>
</template>
<script setup lang="ts">
import { NConfigProvider, NGlobalStyle } from "naive-ui";
import XiangqiMap from "@/components/Xiangqi/index.vue";
import TauriAppsApiLIst from "@/components/TauriAppsApiLIst/index.vue";
</script>

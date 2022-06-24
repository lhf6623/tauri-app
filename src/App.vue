<template>
  <NConfigProvider abstract preflight-style-disabled>
    <XiangqiMap />
    <NGlobalStyle />
  </NConfigProvider>
</template>
<script setup lang="ts">
import { NConfigProvider, NGlobalStyle } from "naive-ui";
import XiangqiMap from "@/views/index.vue";
</script>

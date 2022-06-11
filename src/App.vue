<template>
  <NConfigProvider abstract>
    <NGlobalStyle />
    <XiangqiMap />
  </NConfigProvider>
</template>
<script setup lang="ts">
import { NConfigProvider, NGlobalStyle } from "naive-ui";
import XiangqiMap from "@/views/index.vue";
console.log(`🚀 ~ XiangqiMap`, XiangqiMap);
</script>

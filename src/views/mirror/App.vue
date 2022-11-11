<template>
  <NConfigProvider abstract preflight-style-disabled>
    <Mirror />
    <NGlobalStyle />
  </NConfigProvider>
</template>
<script setup lang="ts">
import { NConfigProvider, NGlobalStyle } from "naive-ui";
import Mirror from "./mirror.vue";
import { useMirrorStore } from "/@/store/modules/mirror";
import { getCurrent } from "@tauri-apps/api/window";
const mirrorStore = useMirrorStore();
mirrorStore.initWindow();
const monitor = getCurrent();
console.log(`🚀 ~ monitor`, monitor);
/* monitor.then((res) => {
  console.log(`🚀 ~ res`, res);
}); */
</script>

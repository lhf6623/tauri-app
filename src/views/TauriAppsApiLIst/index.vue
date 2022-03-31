<template>
  <NScrollbar ref="scrollbarRef">
    <NDialogProvider>
      <DialogApi />
      <AppApi />
      <OsApi />
      <NoticeApi />
      <ProcessApi />
    </NDialogProvider>
  </NScrollbar>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import AppApi from "./app-api.vue";
import OsApi from "./os-api.vue";
import ProcessApi from "./process-api.vue";
import NoticeApi from "./notice.api.vue";
import DialogApi from "./dialog-api.vue";

import { NDialogProvider, NScrollbar, ScrollbarInst } from "naive-ui";
const scrollbarRef = ref<ScrollbarInst | null>(null);
provide("scrollFn", (top: number, type: "scrollBy" | "scrollTo") => {
  scrollbarRef.value?.[type]({ top, behavior: "smooth" });
});
</script>

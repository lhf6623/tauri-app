<template>
  <NScrollbar>
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
import AppApi from "./app-api.vue";
import OsApi from "./os-api.vue";
import ProcessApi from "./process-api.vue";
import NoticeApi from "./notice.api.vue";
import DialogApi from "./dialog-api.vue";

import { NDialogProvider, NScrollbar } from "naive-ui";
</script>

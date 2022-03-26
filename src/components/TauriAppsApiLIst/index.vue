<template>
  <div class="m-2">
    <AppApi />
    <OsApi />
    <NoticeApi />
    <ProcessApi />
  </div>
</template>

<script setup lang="ts">
import AppApi from "./app-api.vue";
import OsApi from "./os-api.vue";
import ProcessApi from "./process-api.vue";
import NoticeApi from "./notice.api.vue";
</script>

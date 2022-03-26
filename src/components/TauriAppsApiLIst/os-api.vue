<template>
  <div class="shadow mb-1 pb-1">
    <h1 class="font-bold pb-2">OS：提供与操作系统相关的实用工具方法和属性。</h1>
    <p>特定于操作系统的行尾标记：{{ osInfo.EOL }}</p>
    <p>操作系统平台：{{ osInfo.platform }}</p>
    <p>系统内核版本：{{ osInfo.version }}</p>
    <p>系统：{{ osInfo.type }}</p>
    <p>CPU架构：{{ osInfo.arch }}</p>
    <p class="whitespace-normal break-words break-all">
      临时文件的默认目录：{{ osInfo.tempdir }}
    </p>
  </div>
</template>

<script setup lang="ts">
import {
  EOL,
  arch,
  platform,
  tempdir,
  type,
  version,
} from "@tauri-apps/api/os";
import { computed, reactive } from "vue";

const osInfo = computed(() => {
  let info = reactive<OsInfo>({
    EOL: JSON.stringify(EOL),
  });
  arch().then((res) => {
    info.arch = res;
  });
  platform().then((res) => {
    info.platform = res;
  });
  tempdir().then((res) => {
    info.tempdir = res;
  });
  type().then((res) => {
    info.type = res;
  });
  version().then((res) => {
    info.version = res;
  });

  return info;
});
</script>

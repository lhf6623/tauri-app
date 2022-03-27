<template>
  <CustomCard title="OS：操作系统相关的方法和属性">
    <p>特定于操作系统的行尾标记：{{ osInfo.EOL }}</p>
    <p>操作系统平台：{{ osInfo.platform }}</p>
    <p>系统版本：{{ osInfo.version }}</p>
    <p>系统：{{ osInfo.type }}</p>
    <p>CPU架构：{{ osInfo.arch }}</p>
    <p class="whitespace-normal break-words break-all">
      临时文件的默认目录：{{ osInfo.tempdir }}
    </p>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from "./components/custom-card.vue";
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

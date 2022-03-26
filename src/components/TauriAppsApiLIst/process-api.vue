<template>
  <div class="shadow mb-1 pb-1">
    <h1 class="font-bold pb-2">Process：对当前进程执行操作。</h1>
    <p class="flex justify-around">
      <NButton size="small" @click="relaunch">
        <template #icon>
          <RefreshCircleOutline />
        </template>
        重启
      </NButton>
      <NButton size="small" @click="handleExit">
        <template #icon>
          <CloseCircleOutline />
        </template>
        关闭
      </NButton>
    </p>
  </div>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
import { CloseCircleOutline, RefreshCircleOutline } from "@vicons/ionicons5";
import { exit, relaunch } from "@tauri-apps/api/process";

const handleExit = () => {
  exit(0);
};
</script>

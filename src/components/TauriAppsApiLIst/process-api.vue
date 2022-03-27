<template>
  <CustomCard title="Process：对当前进程执行操作">
    <p class="flex justify-around">
      <NButton size="small" @click="relaunch">
        <template #icon>
          <RefreshCircleOutline />
        </template>
        重启
      </NButton>
      <NButton size="small" @click="handleExit">
        <template #icon>
          <ExitOutline />
        </template>
        关闭
      </NButton>
    </p>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from "./components/custom-card.vue";
import { NButton } from "naive-ui";
import { ExitOutline, RefreshCircleOutline } from "@vicons/ionicons5";
import { exit, relaunch } from "@tauri-apps/api/process";

const handleExit = () => {
  exit(0);
};
</script>

<template>
  <CustomCard title="Dialog：系统对话框">
    <p class="flex justify-around">
      <NButton size="small" @click="handleOpenDialog">
        <template #icon>
          <TaskOutlined />
        </template>
        ask
      </NButton>
      <NButton size="small" @click="handleConfirm">
        <template #icon>
          <AssetConfirm />
        </template>
        confirm
      </NButton>
      <NButton size="small" @click="handleConfirm">
        <template #icon>
          <Message />
        </template>
        message
      </NButton>
    </p>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from "./components/custom-card.vue";
import { NButton } from "naive-ui";
import { TaskOutlined } from "@vicons/material";
import { Message } from "@vicons/tabler";
import { AssetConfirm } from "@vicons/carbon";

import { open, save, message, ask, confirm } from "@tauri-apps/api/dialog";
import type {
  DialogFilter,
  OpenDialogOptions,
  SaveDialogOptions,
} from "@tauri-apps/api/dialog";

const handleOpenDialog = async () => {
  const isAsk = await ask("message", "title");
  console.log(`🚀 ~ 用户点击了`, isAsk ? "Yes" : "No");
};

const handleConfirm = async () => {
  const isConfirm = await confirm("message", "title");
  console.log(`🚀 ~ 用户点击了`, isConfirm ? "Ok" : "Cancel");
};
</script>

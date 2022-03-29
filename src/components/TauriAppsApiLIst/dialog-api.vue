<template>
  <CustomCard title="Dialog：系统对话框">
    <p class="flex flex-wrap justify-between">
      <NButton size="small" class="mb-1" @click="handleOpenDialog">
        <template #icon>
          <TaskOutlined />
        </template>
        ask
      </NButton>
      <NButton size="small" class="mb-1" @click="handleConfirm">
        <template #icon>
          <AssetConfirm />
        </template>
        confirm
      </NButton>
      <NButton size="small" class="mb-1" @click="handleMessage">
        <template #icon>
          <Message />
        </template>
        message
      </NButton>
      <NButton size="small" @click="handleOpen">
        <template #icon>
          <VolumeFileStorage />
        </template>
        open
      </NButton>
      <NButton size="small" @click="handleSave">
        <template #icon>
          <Save />
        </template>
        save
      </NButton>
    </p>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from "./components/custom-card.vue";
import { NButton } from "naive-ui";
import { TaskOutlined } from "@vicons/material";
import { Message } from "@vicons/tabler";
import { AssetConfirm, VolumeFileStorage, Save } from "@vicons/carbon";

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

const handleMessage = () => {
  message("message");
};

const handleOpen = async () => {
  const option: OpenDialogOptions = {
    title: "对话框的标题",
    filters: [
      {
        name: "img",
        extensions: ["jpg"],
      },
    ],
    // 打开的初始目录
    defaultPath: "/Users/lhf/Documents/img",
    // 多选
    multiple: true,
    // 选择目录,目录只能单选
    directory: true,
    recursive: true,
  };
  let files = await open(option);
  console.log(`🚀 ~ files`, files);
};

const handleSave = async () => {
  const option: SaveDialogOptions = {
    title: "标题",
    defaultPath: "/Users/lhf/Documents/img",
  };
  let _saveFile = await save(option);
  console.log(`🚀 ~ _saveFile`, _saveFile);
};
</script>

<template>
  <CustomCard title="Notification：向用户发送通知">
    <p class="flex justify-around">
      <NButton size="small" @click="handleSendNotice">
        <template #icon>
          <NotificationOutlined />
        </template>
        发送通知
      </NButton>
    </p>
  </CustomCard>
</template>

<script setup lang="ts">
import CustomCard from "./components/custom-card.vue";
import { NButton, useDialog } from "naive-ui";
import { NotificationOutlined } from "@vicons/antd";

import {
  sendNotification,
  requestPermission,
  isPermissionGranted,
} from "@tauri-apps/api/notification";
import type { Options } from "@tauri-apps/api/notification";

const dialog = useDialog();
async function handleSendNotice() {
  let isPass = await isPermissionGranted();
  if (!isPass) {
    let permission = await requestPermission();
    if (permission === "denied") {
      dialog.error({
        title: "错误提示",
        content: "系统拒绝发送消息",
        iconPlacement: "top",
        showIcon: false,
      });
    }
    if (permission !== "granted") {
      return;
    }
  }
  const options: Options = {
    title: "title",
    body: "body",
  };
  sendNotification(options);
}
</script>

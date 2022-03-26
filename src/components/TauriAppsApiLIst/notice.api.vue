<template>
  <div class="shadow mb-1 pb-1">
    <h1 class="font-bold pb-2">Notification：向用户发送 Toast 通知</h1>
    <p class="flex justify-around">
      <NButton size="small" @click="handleSendNotice">
        <template #icon>
          <NotificationsCircleOutline />
        </template>
        发送通知
      </NButton>
    </p>
  </div>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
import { NotificationsCircleOutline } from "@vicons/ionicons5";

import {
  sendNotification,
  requestPermission,
  isPermissionGranted,
} from "@tauri-apps/api/notification";
import type { Options } from "@tauri-apps/api/notification";

async function handleSendNotice() {
  let isPass = await isPermissionGranted();
  if (!isPass) {
    let permission = await requestPermission();
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

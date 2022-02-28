<template>
  <NPopover :show-arrow="false" title="设置" trigger="click">
    <template #trigger>
      <NButton size="tiny" type="info" circle quaternary aria-label="设置">
        <template #icon>
          <NIcon :component="Settings" />
        </template>
      </NButton>
    </template>
    <NSpace justify="space-around" size="large">
      <ThemeButton />
      <TipsButton />
    </NSpace>
  </NPopover>
</template>

<script setup lang="ts">
import { NButton, NIcon, NPopover, NText, NSpace } from "naive-ui";
import { Settings } from "@vicons/ionicons5";
import ThemeButton from "./theme-button.vue";
import TipsButton from "./tips-button.vue";
</script>

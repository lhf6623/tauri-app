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
      <SettingButtonVue
        :icon-component="themeIcon"
        aria-label="改变主题按钮"
        @click="handleToggleDark"
      />
      <SettingButtonVue
        :icon-component="tipsIcon"
        aria-label="棋子可移动格子提示按钮"
        @click="handleChangeTips"
      />
    </NSpace>
  </NPopover>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { NButton, NIcon, NPopover, NSpace } from "naive-ui";
import SettingButtonVue from "./setting-button.vue";

import {
  Settings,
  SunnySharp,
  Moon,
  AlertCircleSharp,
  AlertCircleOutline,
} from "@vicons/ionicons5";
import { useToggle } from "@vueuse/core";

import { isDark } from "@/components/Xiangqi/vueuse/dark";

import { useGlobalState } from "@/components/Xiangqi/vueuse/store";

const handleToggleDark = useToggle(isDark);
const themeIcon = computed(() => {
  return isDark ? Moon : SunnySharp;
});

const store = useGlobalState();

function handleChangeTips() {
  store.value.tips = !store.value.tips;
}

const tipsIcon = computed(() => {
  return store.value.tips ? AlertCircleSharp : AlertCircleOutline;
});
</script>

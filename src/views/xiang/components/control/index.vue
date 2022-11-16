<template>
  <footer class="footer-text">
    <NButton size="tiny" type="info" @click="handleReset">重新开始</NButton>
    <NButton type="info" size="tiny">下棋方：{{ nextText }}</NButton>
    <SettingPanel />
  </footer>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
import SettingPanel from "./settingPanel/index.vue";
import { useAppStore } from "/@/store/modules/xiang";
import { computed } from "vue";
import { RED } from "/@xiang/utils/data";

const store = useAppStore();

const nextText = computed(() => {
  let { next } = store;
  return next === RED ? "红方" : "黑方";
});

const handleReset = store.refreshGame;
</script>

<style lang="scss" scoped>
@import "/@xiang/style/config.scss";

.footer-text {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 22px;
  margin-top: 4px;
  font-size: 12px;
  width: 100%;
}
</style>

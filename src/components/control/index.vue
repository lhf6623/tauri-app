<template>
  <footer class="footer-text">
    <NButton size="tiny" type="info" @click="handleReset"> 重新开始 </NButton>
    <p>
      下棋方：<span>{{ nextText }}</span>
    </p>
    <SettingPanel />
  </footer>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
import SettingPanel from "./settingPanel/index.vue";
import { ResetBus } from "@/vueuse/event-bus";
import { useGlobalState } from "@/vueuse/store";
import { computed } from "vue";
import { RED } from "@/utils/data";

const store = useGlobalState();

const nextText = computed(() => {
  let { nextAction } = store.value;
  return nextAction === RED ? "红方" : "黑方";
});

const handleReset = ResetBus.emit;
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";

.footer-text {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 22px;
  margin-top: 4px;
  font-size: 12px;
  width: 100%;

  & > p,
  & > div {
    height: 100%;
    line-height: 22px;
    border-radius: 3px;
  }

  & > p {
    padding: 0 5px;
    color: white;
    background-color: #2080f0;
  }
}
</style>

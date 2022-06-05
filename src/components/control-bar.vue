<template>
  <footer class="footer-text">
    <div class="footer-bus">
      <NButton size="tiny" type="info" @click="handleReset">重新开始</NButton>
      <NButton size="tiny" type="info" @click="handleTrans">旋转</NButton>
    </div>
    <p>
      下棋方：<span>{{ nextText }}</span>
    </p>
    <NButton
      size="tiny"
      type="info"
      circle
      quaternary
      @click="handleChangeTips"
      aria-label="这是一个按钮提示"
    >
      <template #icon>
        <NIcon
          :component="store.tips ? AlertCircleSharp : AlertCircleOutline"
        />
      </template>
    </NButton>
  </footer>
</template>

<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import { resetMatchBus } from "../vueuse/event-bus";
import { AlertCircleSharp, AlertCircleOutline } from "@vicons/ionicons5";
import { useGlobalState } from "../vueuse/store";
import { computed } from "vue";
import { BLACK, RED } from "../utils/data";

const store = useGlobalState();

function handleChangeTips() {
  store.value.tips = !store.value.tips;
}

const nextText = computed(() => {
  let { nextAction } = store.value;
  return nextAction === RED ? "红方" : "黑方";
});

function handleTrans() {
  let isRed = store.value.identity === RED;
  store.value.identity = isRed ? BLACK : RED;
  store.value.transformStyle = `rotate(${isRed ? 180 : 0}deg)  translateZ(0)`;
}

const handleReset = resetMatchBus.emit;
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
}
.footer-bus {
  display: flex;
  justify-content: end;
  button {
    margin-right: 3px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>

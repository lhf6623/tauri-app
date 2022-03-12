<template>
  <footer>
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
      aria-label="棋子可移动格子提示按钮"
      v-bind="$attrs"
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
import { resetMatchBus } from "../vueuse/event-bus-key";
import { AlertCircleSharp, AlertCircleOutline } from "@vicons/ionicons5";
import { useGlobalState } from "@/components/Xiangqi/vueuse/store";
import { computed } from "vue";
import { BLACK, RED } from "../config-data";

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
  store.value.transformStyle = `rotate(${isRed ? 0 : 180}deg)  translateZ(0)`;
}

const handleReset = resetMatchBus.emit;
</script>

<style lang="scss" scoped>
@import "../style/config.scss";

footer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .footer-bus {
    display: flex;
    justify-content: flex-end;

    button {
      margin-right: 3px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>

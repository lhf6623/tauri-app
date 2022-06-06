<template>
  <footer class="footer-text">
    <NButton size="tiny" type="info" @click="handleReset"> 重新开始 </NButton>
    <p>
      下棋方：<span>{{ nextText }}</span>
    </p>
    <div>
      <NButton
        size="tiny"
        type="info"
        circle
        quaternary
        @click="handleChangeTips"
      >
        <template #icon>
          <NIcon
            :component="store.tips ? AlertCircleSharp : AlertCircleOutline"
          />
        </template>
      </NButton>
      <!-- <NButton
        size="tiny"
        type="info"
        circle
        quaternary
        @click="handleChangeTips"
      >
        <template #icon>
          <NIcon :component="store.tips ? LogIn : LogInOutline" />
        </template>
      </NButton> -->
    </div>
  </footer>
</template>

<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import { resetMatchBus } from "../vueuse/event-bus";
import {
  AlertCircleSharp,
  AlertCircleOutline,
  LogInOutline,
  LogIn,
} from "@vicons/ionicons5";
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

  & > p,
  & > div {
    height: 100%;
    line-height: 22px;
    background-color: rgb(255, 255, 255, $bgOpacity);
    border-radius: 5px;
  }

  & > p {
    padding: 0 5px;
  }
}
</style>

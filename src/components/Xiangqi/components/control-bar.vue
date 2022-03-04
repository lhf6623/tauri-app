<template>
  <footer>
    <div class="footer-bus">
      <NButton size="tiny" type="info" @click="resetMatchBus.emit">
        重新开始
      </NButton>
      <NButton size="tiny" type="info" @click="resetMatchBus.emit">
        读谱
      </NButton>
    </div>
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
import { useEventBus } from "@vueuse/core";
import { ResetMatchKey } from "../vueuse/event-bus-key";
import { AlertCircleSharp, AlertCircleOutline } from "@vicons/ionicons5";
import { useGlobalState } from "@/components/Xiangqi/vueuse/store";

const store = useGlobalState();

const resetMatchBus = useEventBus(ResetMatchKey);

function handleChangeTips() {
  store.value.tips = !store.value.tips;
}
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

    &::first-letter {
      button {
        margin-right: 2px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>

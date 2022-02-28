<template>
  <footer>
    <div class="footer-bus">
      <NButton size="tiny" type="info" @click="resetMatchBus.emit">
        重新开始
      </NButton>
    </div>
    <Settings />
  </footer>
</template>

<script setup lang="ts">
import { NButton } from "naive-ui";
import { useEventBus } from "@vueuse/core";
import { ResetMatchKey } from "../../vueuse/event-bus-key";
import Settings from "./settings/index.vue";

const resetMatchBus = useEventBus(ResetMatchKey);
</script>

<style lang="scss" scoped>
@import "../../style/config.scss";

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

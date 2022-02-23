<template>
  <footer>
    <div>
      <NButton size="tiny" type="info" ghost>开始</NButton>
      <NButton size="tiny" type="info" ghost>后退</NButton>
      <NButton size="tiny" type="info" ghost>前进</NButton>
    </div>
    <div>
      <NTooltip trigger="hover">
        <template #trigger>
          <NSwitch
            size="small"
            type="info"
            v-model:value="tips"
            :on-update:value="changeTips"
          />
        </template>
        棋子可移动的格子提示
      </NTooltip>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { inject, ref, Ref } from "vue";
import { NButton, NSwitch, NTooltip } from "naive-ui";

const tips = inject<Ref<boolean>>("tips", ref(false));
const changeTips = inject<(value: boolean) => void>("changeTips");
</script>

<style lang="scss" scoped>
@import "../style/config.scss";

footer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    margin-right: 2px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>

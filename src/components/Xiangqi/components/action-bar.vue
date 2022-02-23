<template>
  <footer>
    <NButton size="tiny" type="info" ghost>开始</NButton>
    <NButton size="tiny" type="info" ghost>后退</NButton>
    <NButton size="tiny" type="info" ghost>前进</NButton>
    <NSwitch
      size="small"
      type="info"
      :rail-style="railStyle"
      v-model:value="tips"
      :on-update:value="changeTips"
      class="absolute right-0"
    >
      <template #checked>提示</template>
      <template #unchecked>提示</template>
    </NSwitch>
  </footer>
</template>

<script setup lang="ts">
import { inject, CSSProperties, ref, Ref } from "vue";
import { NButton, NSwitch } from "naive-ui";

const railStyle = ({ checked }: { checked: boolean }) => {
  const style: CSSProperties = {};
  if (checked) {
    style.background = "#2080f0";
  } else {
    style.background = "#d03050";
  }
  return style;
};

const tips = inject<Ref<boolean>>("tips", ref(false));
const changeTips = inject<(value: boolean) => void>("changeTips");
</script>

<style lang="scss" scoped>
@import "../style/config.scss";

footer {
  position: relative;
  display: flex;
  align-items: center;

  button {
    margin-right: 2px;
  }
}
</style>

<template>
  <footer>
    <div>
      <NButton size="tiny" type="info" ghost>开始</NButton>
      <NButton size="tiny" type="info" ghost @click="handleReset">
        重新开始
      </NButton>
      <NButton size="tiny" type="info" ghost>前进</NButton>
    </div>
    <NSwitch
      size="small"
      type="info"
      v-model:value="store.tips"
      :on-update:value="changeTips"
    />
  </footer>
</template>

<script setup lang="ts">
import { inject, ref, Ref } from "vue";
import { NButton, NSwitch } from "naive-ui";

const store = inject<Ref<StoreType>>("store", ref({}));
const changeTips = inject<(value: boolean) => void>("changeTips");
const changeReset = inject<(value: boolean) => void>("changeReset");

function handleReset() {
  changeReset?.(!store.value.reset);
}
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

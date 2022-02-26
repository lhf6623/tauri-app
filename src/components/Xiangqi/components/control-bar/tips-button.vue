<template>
  <NButton
    size="tiny"
    type="info"
    quaternary
    @click="handleChangeTips"
    aria-label="棋子可移动格子提示按钮"
  >
    <template #icon>
      <NIcon :component="store.tips ? AlertCircleSharp : AlertCircleOutline" />
    </template>
  </NButton>
</template>

<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import { AlertCircleSharp, AlertCircleOutline } from "@vicons/ionicons5";
import { useGlobalState } from "../../vueuse/store";

const store = useGlobalState();

function handleChangeTips() {
  store.value.tips = !store.value.tips;
}
</script>

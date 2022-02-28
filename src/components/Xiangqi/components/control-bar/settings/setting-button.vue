<template>
  <NButton
    size="tiny"
    type="info"
    circle
    quaternary
    @click="click"
    :aria-label="ariaLabel"
    v-bind="$attrs"
  >
    <template #icon>
      <NIcon :component="iconComponent" />
    </template>
  </NButton>
</template>

<script setup lang="ts">
import { Component, PropType } from "vue";
import { NButton, NIcon } from "naive-ui";
defineProps({
  iconComponent: {
    type: Object as PropType<Component | undefined>,
    defautl: undefined,
  },
  ariaLabel: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["click"]);
function click() {
  emit("click");
}
</script>

<template>
  <ul class="number-list" :class="`${type}`">
    <li v-for="(item, index) in list" :key="index">{{ item }}</li>
  </ul>
</template>

<script setup lang="tsx">
import { PropType } from "vue";
defineProps({
  list: {
    type: Object as PropType<string[] | number[]>,
    default: () => [],
  },
  type: {
    type: String as PropType<Type>,
    default: "isBlack",
  },
});
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
@import "../style/number-list.scss";
</style>

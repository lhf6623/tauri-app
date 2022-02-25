<template>
  <ul class="number-list">
    <li v-for="(item, index) in list" :key="index">{{ item }}</li>
  </ul>
</template>

<script setup lang="ts">
import { PropType } from "vue";
defineProps({
  list: {
    type: Object as PropType<string[] | number[]>,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
.number-list {
  height: calc($w * 0.5);
  width: calc($w * 9);
  position: relative;
  display: flex;
  font-size: calc($w * 0.4);
  background-color: $mapColor;

  li {
    width: $w;
    height: calc($w * 0.5);
    text-align: center;
    line-height: calc($w * 0.5);
  }
}
</style>

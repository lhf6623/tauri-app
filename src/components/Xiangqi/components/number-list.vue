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
  /* 上下相加 等于一个 $h */
  height: $h * 0.8; // 25 * 0.7 * 2
  width: $w * 9;
  position: relative;
  display: flex;
  font-size: $w * 0.4;
  background-color: #eed3b3;

  li {
    width: $w;
    height: $h * 0.8;
    text-align: center;
    line-height: $h * 0.8;
  }
}
</style>

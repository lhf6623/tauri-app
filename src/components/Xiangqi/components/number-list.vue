<template>
  <ul class="number-list">
    <li v-for="(item, index) in list" :key="index">{{ item }}</li>
  </ul>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { useGlobalState } from "../vueuse/store";

const store = useGlobalState();
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
  height: $h_n; // 26 * 0.8 * 2
  width: $w * 9;
  position: relative;
  display: flex;
  font-size: $w * 0.5;
  background-color: #eed3b3;

  li {
    width: $w;
    height: $h_n;
    text-align: center;

    transform: v-bind("store.transformStyle");
    transition: transform 1s;
  }
}
</style>

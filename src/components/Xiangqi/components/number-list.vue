<template>
  <ul class="number-list relative flex">
    <li v-for="(item, index) in list" :key="index" class="text-center">
      {{ item }}
    </li>
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
  font-size: $w * 0.5;
  background-color: #eed3b3;

  li {
    width: $w;
    height: $h_n;

    transform: v-bind("store.transformStyle");
    transition: transform 1s;
  }
}
</style>

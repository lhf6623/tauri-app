<template>
  <ul class="number-list">
    <li v-for="(item, index) in list" :key="index">
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
@import "@/style/config.scss";
.number-list {
  position: relative;
  display: flex;
  height: $h_n; // 26 * 0.8 * 2
  width: $w * 9;
  font-size: 14px;

  li {
    text-align: center;
    width: $w;
    height: $h_n;

    transform: v-bind("store.transformStyle");
  }
}
</style>

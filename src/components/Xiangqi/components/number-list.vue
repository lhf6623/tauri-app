<template>
  <ul class="number-list" :class="`${data.type}`">
    <li v-for="(item, index) in data?.list" :key="index">{{ item }}</li>
  </ul>
</template>

<script setup lang="tsx">
import { PropType } from "vue";
defineProps({
  data: {
    type: Object as PropType<{
      list: Array<string | number>;
      type: Type;
    }>,
    default: () => ({}),
  },
});
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
@import "../style/number-list.scss";
</style>

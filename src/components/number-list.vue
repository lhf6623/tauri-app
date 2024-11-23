<template>
  <ul class="number-list">
    <li v-for="(item, index) in list" :key="index">
      {{ item }}
    </li>
  </ul>
</template>

<script setup lang="ts">
  defineProps({
    list: {
      type: Array<string[] | number[]>,
      default: () => [],
    },
  });
</script>

<style lang="scss" scoped>
  @import '@/config.scss';
  .number-list {
    position: relative;
    display: flex;
    height: $h_n; // 26 * 0.8 * 2
    width: $w * 9;
    font-size: 12px;

    li {
      text-align: center;
      width: $w;
      height: $h_n;

      transform: rotate(0deg) translateZ(0);
    }
  }
</style>

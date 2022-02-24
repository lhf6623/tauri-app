<template>
  <XiangqiMap />
</template>
<script setup lang="ts">
import XiangqiMap from "@/components/Xiangqi/index.vue";
import { useGeolocation } from "@vueuse/core";

const { coords, locatedAt, error } = useGeolocation();
console.log(`🚀 ~ coords, locatedAt, error`, coords, locatedAt, error);
</script>

<style lang="scss">
/* html,
body {
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
} */
</style>

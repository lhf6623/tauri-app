<template>
  <ul class="number-list" :class="`${data.type}`">
    <li v-for="(item, index) in data?.list" :key="index">{{ item }}</li>
  </ul>
</template>

<script setup lang="tsx">
import { PropType } from "vue";
const props = defineProps({
  data: {
    type: Object as PropType<{
      list: Array<string | number>;
      type: "isRed" | "isBlack";
    }>,
    default: () => ({}),
  },
});
</script>

<style lang="scss" scoped>
.number-list {
  height: 20px;
  width: 360px;
  position: relative;
  display: flex;
  background-color: azure;
  font-size: 14px;
  font-weight: bold;
  font-family: "楷体", "楷体_GB2312";

  li {
    width: 40px;
    height: 20px;
    text-align: center;
    line-height: 20px;
  }
}
.isRed {
  color: red;
}
.isBlack {
  color: black;
}
</style>

<template>
  <ul class="number-list">
    <li v-for="(item, index) in list" :key="index">{{ item }}</li>
  </ul>
</template>

<script setup lang="tsx">
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
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
</style>

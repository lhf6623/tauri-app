<template>
  <span class="xiangqi-piece" :class="`${data?.type}`">{{ data?.text }}</span>
</template>

<script setup lang="tsx">
import { PropType } from "vue";
const props = defineProps({
  data: {
    type: Object as PropType<{
      text: string;
      type: "isRed" | "isBlack";
      index: number;
    }>,
    default: () => ({}),
  },
});
</script>

<style lang="scss" scoped>
.xiangqi-piece {
  position: absolute;
  z-index: 1;
  height: 36px;
  width: 36px;
  background-color: white;
  box-shadow: 0px 0px 2px 2px rgb(189, 187, 187);
  border-radius: 20px;
  top: 2px;
  left: 2px;
  line-height: 36px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  font-family: SimSun;

  &::after {
    position: absolute;
    content: "";
    width: 88%;
    height: 88%;
    top: 6%;
    left: 6%;
    border-radius: 50%;
    z-index: 10;
  }
}

.isRed {
  color: red;
  &::after {
    border: 1px solid red;
  }
}

.isBlack {
  color: black;
  &::after {
    border: 1px solid black;
  }
}
</style>

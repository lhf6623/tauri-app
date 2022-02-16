<template>
  <span class="xiangqi-piece" :class="`${data?.type}`">{{ data?.text }}</span>
</template>

<script setup lang="tsx">
import { PropType } from "vue";
const props = defineProps({
  data: {
    type: Object as PropType<{ text: string; type: "isRed" | "isBlack" }>,
    default: () => ({}),
  },
});
</script>

<style lang="scss" scoped>
.xiangqi-piece {
  position: absolute;
  z-index: 1;
  height: 38px;
  width: 38px;
  background-color: white;
  box-shadow: 0px 0px 2px 2px rgb(189, 187, 187);
  border-radius: 20px;
  top: 1px;
  left: 1px;
  line-height: 38px;
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

.isRed::after {
  border: 1px solid red;
}

.isBlack::after {
  border: 1px solid black;
}
</style>

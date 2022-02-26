<template>
  <div>
    <div class="xiangqi-piece" :class="`${data?.type}`">
      {{ data?.text }}
    </div>
    <Active v-show="active.includes(index)" :color="color"></Active>
  </div>
</template>

<script setup lang="tsx">
import { PropType, computed } from "vue";
import Active from "./active.vue";
const props = defineProps({
  data: {
    type: Object as PropType<PieceType | null>,
    default: () => ({}),
  },
  index: {
    type: Number,
    default: 0,
  },
  active: {
    type: Array as PropType<number[]>,
    default: [],
  },
});

const color = computed(() => {
  const isRed = props.active.findIndex((item) => item === props.index) === 0;
  return isRed ? "red" : "black";
});
</script>

<style lang="scss" scoped>
@import "../../style/config.scss";
.xiangqi-piece {
  position: absolute;
  z-index: 100;
  width: calc($w - 2px);
  height: calc($h - 2px);
  top: 2px;
  left: 2px;
  border-radius: $h;
  font-weight: 700;
  line-height: calc($h - 2px);
  text-align: center;
}
.isRed {
  background-color: $isRed;
  color: white;
}
.isBlack {
  background-color: $isBlack;
  color: white;
}
</style>

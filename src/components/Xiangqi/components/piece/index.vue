<template>
  <div class="piece">
    <div v-show="data" class="xiangqi-piece" :class="`${data?.type}`">
      {{ data?.text }}
    </div>
    <Active v-show="showActive" :color="activeColor"></Active>
  </div>
</template>

<script setup lang="tsx">
import { PropType, computed } from "vue";
import Active from "./active.vue";
import { useGlobalState } from "../../vueuse/store";

const store = useGlobalState();

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

const activeColor = computed(() => {
  const isRed = props.active.findIndex((item) => item === props.index) === 0;
  return isRed ? "red" : "black";
});

const showActive = computed(() => {
  return props.active.includes(props.index);
});
</script>

<style lang="scss" scoped>
@import "../../style/config.scss";

.piece {
  width: $w;
  height: $h;
  position: relative;
  z-index: 100;
}
.xiangqi-piece {
  position: absolute;
  width: $w - 2px;
  height: $h - 2px;
  top: 1px;
  left: 1px;
  border-radius: $h;
  font-weight: 700;
  line-height: $h - 2px;
  text-align: center;

  transform: v-bind("store.transformStyle");
  transition: transform 1s;
}
.isRed {
  background-color: red;
  color: white;
}
.isBlack {
  background-color: black;
  color: white;
}
</style>

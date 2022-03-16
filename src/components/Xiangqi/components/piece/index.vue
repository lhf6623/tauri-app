<template>
  <div class="piece relative z-100">
    <div
      v-show="data"
      class="xiangqi-piece absolute text-center font-bold text-white"
      :class="`${data?.type} cursor-${
        data || showActive ? 'pointer' : 'default'
      }`"
    >
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

/*  cursor: pointer; */
.piece {
  width: $w;
  height: $h;
  z-index: 100;
}
.xiangqi-piece {
  width: $w - 2px;
  height: $h - 2px;
  line-height: $h - 2px;
  top: 1px;
  left: 1px;
  border-radius: $h;
  z-index: 99;
  transform: v-bind("store.transformStyle");
  transition: transform 1s;
}
.isRed {
  background-color: red;
}
.isBlack {
  background-color: black;
}
</style>

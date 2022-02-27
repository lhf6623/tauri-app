<template>
  <div>
    <div class="xiangqi-piece" :class="`${data?.type}`">
      {{ data?.text }}
    </div>
    <Active v-show="active.includes(index)" :color="color"></Active>
  </div>
</template>

<script setup lang="tsx">
import { PropType, computed, Ref } from "vue";
import Active from "./active.vue";
import { useThemeVars } from "naive-ui";
const themeVars = useThemeVars() as unknown as Ref<
  ThemeOverridesType["common"]
>;

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
  const { xActiveColor, xActiveEmptyColor } = themeVars.value;
  return isRed ? xActiveColor : xActiveEmptyColor;
});
</script>

<style lang="scss" scoped>
@import "../../style/config.scss";
.xiangqi-piece {
  position: absolute;
  z-index: 100;
  width: calc(var(--x-width) - 2px);
  height: calc(var(--x-height) - 2px);
  top: 2px;
  left: 2px;
  border-radius: var(--x-height);
  font-weight: 700;
  line-height: calc(var(--x-height) - 2px);
  text-align: center;
}
.isRed {
  background-color: var(--x-red-bg-color);
  color: var(--x-red-text-color);
}
.isBlack {
  background-color: var(--x-black-bg-color);
  color: var(--x-black-text-color);
}
</style>

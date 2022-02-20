<template>
  <ul class="checkerboard">
    <li
      v-for="(item, index) in mapList"
      class="lattice"
      @click="handleActive(index, item)"
    >
      <!-- 斜线 -->
      <i class="lattice-line"></i>
      <!-- 棋子 -->
      <XiangqiPiece :data="item" :active="active == index" />
    </li>
  </ul>
</template>

<script setup lang="tsx">
import XiangqiPiece from "./xiangqi-piece.vue";
import { ref, onMounted } from "vue";
import { piece_init_list, run_rule } from "../data";

const active = ref<number | null>(null);
const mapList = ref<Array<PieceType | null>>(Array(90).fill(null));

onMounted(() => {
  piece_init_list.forEach((item) => {
    let { index } = item;
    mapList.value[index] = { ...item };
  });
});

const handleActive = (index: number, item: PieceType | null): void => {
  if (active.value !== null && item === null) {
    let _piece = mapList.value[active.value] as PieceType;
    mapList.value[index] = { ..._piece, index };
    mapList.value[active.value] = null;
    active.value = null;
  }
  if (!!item) {
    active.value = index;
    let { code, type } = item;
    let run_lattice = run_rule[code]?.(mapList.value, item);
    console.log(`🚀 ~ run_lattice`, run_lattice);
  }
};
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
@import "../style/xiangqi-map.scss";
</style>

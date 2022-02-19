<template>
  <ul class="checkerboard">
    <li
      v-for="(item, index) in piece"
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
import { piece_init_list } from "../data";

const active = ref<number | null>(null);
const piece = ref<Array<PieceType | null>>(Array(90).fill(null));

onMounted(() => {
  piece_init_list.forEach((item) => {
    let { index } = item;
    piece.value[index] = { ...item };
  });
});

const handleActive = (index: number, item: PieceType): void => {
  if (item) {
    active.value = index;
  }
  if (active === null) {
    piece.value[index] = null;
  }
};
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
@import "../style/xiangqi-map.scss";
</style>

<template>
  <div class="xiangqi-box">
    <div class="main-box">
      <NumberList
        :data="{
          list: numbers,
          type: 'isBlack',
        }"
      />
      <ul class="checkerboard">
        <li v-for="(item, index) in piece" class="lattice">
          <!-- 斜线 -->
          <i class="lattice-line"></i>
          <!-- 棋子 -->
          <XiangqiPiece
            :data="item"
            :active="active == index"
            @click="handleActive(index, item)"
          />
        </li>
      </ul>
      <NumberList
        :data="{
          list: numbers_cn,
          type: 'isRed',
        }"
      />
    </div>
    <RecordList v-if="true" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import NumberList from "./components/number-list.vue";
import RecordList from "./components/record-list.vue";
import XiangqiPiece from "./components/xiangqi-piece.vue";
import { numbers, numbers_cn, piece_init_list } from "./data";

const piece = ref<PieceType[]>(Array(90).fill(null));
const active = ref<number | null>(89);

onMounted(() => {
  piece_init_list.forEach((item) => {
    let { index } = item;
    piece.value[index] = { ...item };
  });
});
function handleActive(index: number, item: PieceType) {
  active.value = index;
}
</script>

<style lang="scss" scoped>
@import "./style/config.scss";
@import "./style/map.scss";
</style>

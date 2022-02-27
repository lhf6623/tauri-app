<template>
  <div class="checkerboard">
    <ul class="map-layout">
      <li
        v-for="(item, index) in mapList"
        class="lattice"
        @click="handleActive(index, item)"
      >
        <!-- 斜线 -->
        <i class="lattice-line"></i>
        <!-- 棋子 -->
        <XiangqiPiece :data="item" :active="tipsActive" :index="index" />
      </li>
    </ul>
    <div class="limit">楚河汉界</div>
  </div>
</template>

<script setup lang="tsx">
import XiangqiPiece from "./piece/index.vue";
import { ref, onMounted, computed } from "vue";
import { piece_list, NULL, COL, ROW, RED, BLACK } from "../config-data";
import { run_rule } from "../config-data/run-rule";
import { isEmpty, delay } from "lodash-es";
import { useEventBus } from "@vueuse/core";
import { ResetMatchKey } from "../vueuse/event-bus-key";
import { useGlobalState } from "../vueuse/store";

const store = useGlobalState();

const handleReset = useEventBus(ResetMatchKey);

/**
 * 第一个为选中的棋子，后面的是能运动的格子
 */
const active = ref<number[]>([]);
const nextPiece = ref<Type>(RED);
const mapList = ref<Array<PieceType | null>>([]);

function initMapList() {
  mapList.value = Array(COL * ROW).fill(NULL);
  piece_list.forEach((item) => {
    let { index } = item;
    mapList.value[index] = { ...item };
  });
  nextPiece.value = RED;
  active.value = [];
}
handleReset.on(initMapList);

onMounted(() => {
  initMapList();
});

const tipsActive = computed(() => {
  if (isEmpty(active.value)) return [];
  let [index] = active.value;
  return store.value.tips ? active.value : [index];
});

async function setActive(piece: PieceType | null | undefined) {
  active.value = [];
  delay(() => {
    if (piece) {
      let { code, index } = piece;
      let run_lattice = run_rule[code]?.(mapList.value, piece) || [];
      active.value = [index, ...run_lattice];
    } else {
      active.value = [];
    }
  }, 0);
}

const handleActive = (index: number, item: PieceType | null): void => {
  // 走棋
  if (!isEmpty(active.value)) {
    let [pieceIndex] = active.value;
    let _piece = mapList.value[pieceIndex] as PieceType;

    // 空地
    if (item === NULL && !active.value.includes(index)) return;

    if (item) {
      // 同一阵营的更新选中棋子
      if (_piece.type === item.type) {
        setActive(item);
        return;
      }
      if (!active.value.includes(index)) return;
    }
    mapList.value[index] = { ..._piece, index };
    mapList.value[pieceIndex] = NULL;
    setActive(null);
    nextPiece.value = nextPiece.value === RED ? BLACK : RED;
    return;
  }

  // 选中棋子
  if (item !== NULL && isEmpty(active.value) && nextPiece.value === item.type) {
    setActive(item);
  }
};
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
.checkerboard {
  position: relative;
  width: calc(var(--x-width) * 9);
  height: calc(var(--x-height) * 10);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}
/* 楚河汉界 */
.limit {
  position: absolute;
  height: var(--x-height);
  width: 100%;
  top: calc(50% - var(--x-height) / 2);
  z-index: 10;
  text-align: center;
  line-height: var(--x-height);
  text-indent: calc(var(--x-width) * 1.3);
  letter-spacing: calc(var(--x-width) * 1.3);
}
.map-layout {
  position: relative;
  background-color: var(--x-plate-color);
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;

  &::after {
    position: absolute;
    content: "";
    width: calc(100% - var(--x-width) * 0.6);
    left: calc(var(--x-width) * 0.3);
    height: calc(100% - var(--x-height) * 0.6);
    top: calc(var(--x-height) * 0.3);
    border: 2px solid var(--x-line-color);
  }
  .lattice {
    position: relative;
    width: var(--x-width);
    height: var(--x-height);
    display: flex;
    align-items: center;
    justify-content: center;

    /* 横 */
    &::after {
      @include pseudo-class(100%, 1px);
      background-color: var(--x-line-color);
    }
    &::before {
      @include pseudo-class(1px, 100%);
      background-color: var(--x-line-color);
    }

    /* 横 左 */
    @each $key in $w_left {
      &:nth-child(#{$key}) {
        &::after {
          right: 0;
          width: calc(50% + 1px);
        }
        &::before {
          width: 1px;
          right: calc(50% - 0px);
        }
      }
    }
    /* 横 右 */
    @each $key in $w_right {
      &:nth-child(#{$key}) {
        &::after {
          left: 0px;
          width: calc(50% + 1px);
        }
        &::before {
          width: 1px;
          left: 50%;
        }
      }
    }
    /* 竖 上 */
    @each $key in $w_top {
      &:nth-child(#{$key}) {
        &::before {
          bottom: 0;
          height: 50%;
        }
        &::after {
          height: 1px;
          bottom: 50%;
        }
      }
    }
    /* 竖 下 */
    @each $key in $w_down {
      &:nth-child(#{$key}) {
        &::before {
          top: 0;
          height: 50%;
        }
        &::after {
          height: 1px;
          top: 50%;
        }
      }
    }

    /* 楚河汉界 上 */
    @each $key in $ch_top {
      &:nth-child(#{$key})::before {
        top: 0;
        height: 50%;
      }
    }
    /* 楚河汉界 下 */
    @each $key in $ch_down {
      &:nth-child(#{$key})::before {
        bottom: 0;
        height: 50%;
      }
    }

    & .lattice-line {
      display: none;
    }
    /* 斜线 \ */
    @each $key in $slash_back {
      &:nth-child(#{$key}) .lattice-line {
        @include lattice-line-rotate(45deg);
      }
    }
    /* 斜线 / */
    @each $key in $slash {
      &:nth-child(#{$key}) .lattice-line {
        @include lattice-line-rotate(-45deg);
      }
    }

    /* 右下 */
    @each $key in $position_r_b {
      &:nth-child(#{$key}) .lattice-line {
        @include lattice-line-mixin;
        &::after {
          @include lattice-line-pseudo(right, bottom);
        }
      }
    }

    /* 左下 */
    @each $key in $position_l_b {
      &:nth-child(#{$key}) .lattice-line {
        @include lattice-line-mixin;
        &::after {
          @include lattice-line-pseudo(left, bottom);
        }
      }
    }

    /* 左上 */
    @each $key in $position_l_t {
      &:nth-child(#{$key}) .lattice-line {
        @include lattice-line-mixin;
        &::before {
          @include lattice-line-pseudo(left, top);
        }
      }
    }

    /* 右上 */
    @each $key in $position_r_t {
      &:nth-child(#{$key}) .lattice-line {
        @include lattice-line-mixin;
        &::before {
          @include lattice-line-pseudo(right, top);
        }
      }
    }
  }
}
</style>

<template>
  <div class="checkerboard relative select-none">
    <ul class="map-layout relative w-full h-full flex flex-wrap">
      <li
        v-for="(item, index) in mapList"
        class="lattice relative flex items-center justify-center"
        @click="handleActive(index, item)"
      >
        <!-- 斜线 -->
        <i class="lattice-line"></i>
        <!-- 棋子 -->
        <XiangqiPiece :data="item" :active="tipsActive" :index="index" />
      </li>
    </ul>
    <div class="limit absolute w-full flex justify-evenly">
      <span>楚</span>
      <span>河</span>
      <span>汉</span>
      <span>界</span>
    </div>
  </div>
</template>

<script setup lang="tsx">
import XiangqiPiece from "./piece/index.vue";
import { ref, onMounted, computed } from "vue";
import { piece_list, NULL, COL, ROW, RED, BLACK } from "../config-data";
import { run_rule } from "../config-data/run-rule";
import { isEmpty, delay, cloneDeep } from "lodash-es";
import { resetMatchBus } from "../vueuse/event-bus-key";
import { useGlobalState } from "../vueuse/store";
import { makingChess } from "../config-data/making-chess";

const store = useGlobalState();

// 第一个为选中的棋子，后面的是能运动的格子
const active = ref<number[]>([]);
const mapList = ref<Array<PieceType | null>>([]);

function initMapList() {
  mapList.value = Array(COL * ROW).fill(NULL);
  piece_list.forEach((item) => {
    let { index } = item;
    mapList.value[index] = { ...item };
  });
  store.value.nextAction = RED;
  active.value = [];
  store.value.record = [];
}

onMounted(() => {
  // 事件总线
  resetMatchBus.on(initMapList);
  // 初始化数据
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
/**
 *
 * @param index 选中格子的索引
 * @param item 选中格子的数据 棋子 | 空地
 */
const handleActive = (index: number, item: PieceType | null): void => {
  let [pieceIndex] = active.value;
  // 走棋
  if (active.value.length) {
    let _piece = mapList.value[pieceIndex] as PieceType;

    // 空地, 不在棋子可行走范围内
    if (item === NULL && !active.value.includes(index)) return;

    if (item) {
      // 同一阵营的更新选中棋子
      if (_piece.type === item.type) {
        setActive(item);
        return;
      }
      // 不在棋子可行走范围内
      if (!active.value.includes(index)) return;
    }
    const _mapList = cloneDeep(mapList.value);

    mapList.value[index] = { ..._piece, index };
    mapList.value[pieceIndex] = NULL;
    setActive(null);
    store.value.nextAction = store.value.nextAction === RED ? BLACK : RED;
    let chessManual = makingChess(_mapList, pieceIndex, index);
    store.value.record.push(chessManual);
    return;
  }

  // 选中棋子
  if (
    item !== NULL &&
    isEmpty(active.value) &&
    store.value.nextAction === item.type
  ) {
    setActive(item);
  }
};
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
.checkerboard {
  width: $w * 9;
  height: $h * 10;
}
/* 楚河汉界 */
.limit {
  height: $h;
  top: calc(50% - $h * 0.5);
  z-index: 10;

  span {
    display: inline-block;
    transform: v-bind("store.transformStyle");
    transition: transform 1s;
    height: $h;
    line-height: $h;
  }
}
.map-layout {
  background-color: #eed3b3;

  &::after {
    position: absolute;
    content: "";
    width: calc(100% - $w * 0.6);
    left: $w * 0.3;
    height: calc(100% - $h * 0.6);
    top: $h * 0.3;
    border: 2px solid grey;
  }
  .lattice {
    width: $w;
    height: $h;

    /* 横 */
    &::after {
      @include pseudo-class(100%, 1px);
      background-color: grey;
    }
    &::before {
      @include pseudo-class(1px, 100%);
      background-color: grey;
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

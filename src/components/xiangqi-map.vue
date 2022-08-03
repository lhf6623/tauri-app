<template>
  <div class="map-box shadow">
    <NumberList :list="numbers" />
    <div class="checkerboard">
      <ul class="lattices">
        <XiangqiPiece
          v-for="(item, index) in mapList"
          class="lattice"
          @click="handleActive(index, item)"
          :data="item"
          :active="tipsActive"
          :index="index"
        />
      </ul>
      <Rivers />
    </div>
    <NumberList :list="numbers_cn" />
  </div>
</template>

<script setup lang="tsx">
import XiangqiPiece from "./piece/index.vue";
import Rivers from "./rivers.vue";
import NumberList from "./number-list.vue";
import { ref, onMounted, computed } from "vue";
import { makingChess, initMap, readChess } from "@/utils";
import { NULL, RED, BLACK, numbers, numbers_cn } from "@/utils/data";
import { run_rule } from "@/utils/run-rule";
import { cloneDeep, isEmpty, delay } from "@/utils/is";

import { ResetBus, BackBus } from "@/vueuse/event-bus";
import { useAppStore } from "@/store/modules/app";

const store = useAppStore();

// 第一个为选中的棋子，后面的是能运动的格子
const active = ref<number[]>([]);
const mapList = ref<Array<PieceType | null>>([]);

function initMapList() {
  mapList.value = initMap();
  active.value = [];
  store.initChessGame([]);
}

onMounted(() => {
  // 事件总线 重新开始
  ResetBus.on(initMapList);

  // 初始化数据
  initMapList();

  // 监听时间回溯事件
  BackBus.on((index) => {
    // TODO: 交给 store 来做
    mapList.value = readChess(store.record, index);
  });
});

const tipsActive = computed(() => {
  if (isEmpty(active.value)) return [];
  let [index] = active.value;
  return store.setting.tips ? active.value : [index];
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
    store.setNextAction();

    store.setRecord(
      makingChess(_mapList, pieceIndex, index),
      mapList.value.flatMap((item) => (item === NULL ? [] : [item]))
    );
    return;
  }

  // 选中棋子
  if (
    item !== NULL &&
    isEmpty(active.value) &&
    store.nextAction === item.type
  ) {
    setActive(item);
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";

.map-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: $w * 9 + 4px;
  height: ($h * 10) + ($h_n * 2);
  transform: v-bind("store.transformStyle");

  background-color: rgba(238, 211, 179, var(--bgOpacity));

  user-select: none;
  -webkit-user-select: none;

  cursor: pointer;
}
.checkerboard {
  position: relative;
  width: $w * 9;
  height: $h * 10;
}
.lattices {
  position: relative;
  width: $w * 9;
  height: $h * 10;
  display: flex;
  flex-wrap: wrap;
  /* 最外围的框框 */
  &::after {
    position: absolute;
    content: "";
    width: calc(100% - $w * 0.6);
    left: $w * 0.3;
    height: calc(100% - $h * 0.6);
    top: $h * 0.3;
    border: 2px solid $lineColor;
  }
  /* 格子 */
  .lattice {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $w;
    height: $h;

    /* 横 */
    &::after {
      @include pseudo-class(100%, 1px);
      background-color: $lineColor;
    }
    /* 竖 */
    &::before {
      @include pseudo-class(1px, 100%);
      background-color: $lineColor;
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

    /* 位置角标右下 */
    @each $key in $position_r_b {
      &:nth-child(#{$key}) .lattice-line {
        @include lattice-line-mixin;
        &::after {
          @include lattice-line-pseudo(right, bottom);
        }
      }
    }

    /* 位置角标左下 */
    @each $key in $position_l_b {
      &:nth-child(#{$key}) .lattice-line {
        @include lattice-line-mixin;
        &::after {
          @include lattice-line-pseudo(left, bottom);
        }
      }
    }

    /* 位置角标左上 */
    @each $key in $position_l_t {
      &:nth-child(#{$key}) .lattice-line {
        @include lattice-line-mixin;
        &::before {
          @include lattice-line-pseudo(left, top);
        }
      }
    }

    /* 位置角标右上 */
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

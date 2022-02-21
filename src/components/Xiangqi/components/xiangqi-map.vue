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
        <XiangqiPiece :data="item" :active="active == index" />
      </li>
    </ul>
    <div class="limit">楚河汉界</div>
  </div>
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
.checkerboard {
  position: relative;
  width: calc($w * 9);
  height: calc($h * 10);
}
/* 楚河汉界 */
.limit {
  position: absolute;
  height: $h;
  width: 100%;
  top: calc(50% - $h / 2);
  z-index: 10;
  text-align: center;
  line-height: $h;
  text-indent: $w * 1.3;
  letter-spacing: $w * 1.3;
}
.map-layout {
  position: relative;
  background-color: $mapColor;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;

  &::after {
    position: absolute;
    content: "";
    width: calc(100% - $w * 0.6);
    left: $w * 0.3;
    height: calc(100% - $h * 0.6);
    top: $h * 0.3;
    border: 2px solid $lineColor;
  }
  .lattice {
    position: relative;
    width: $w;
    height: $h;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      @include pseudo(100%, 1px);
      background-color: $lineColor;
    }
    &::before {
      @include pseudo(1px, 100%);
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

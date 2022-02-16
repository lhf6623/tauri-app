<template>
  <div class="xiangqi-box">
    <div class="main-box">
      <NumberList :list="numbers" />
      <ul class="checkerboard">
        <li v-for="i in 90" class="lattice">
          {{ "&nbsp;" || i }}
          <!-- 斜线 -->
          <i class="lattice-line"></i>
          <!-- 棋子 -->
          <XiangqiPiece v-if="i % 2" />
        </li>
      </ul>
      <NumberList :list="numbers_cn" />
    </div>
    <RecordList v-if="false" />
  </div>
</template>
<!-- 棋盘：格子40×40mm，（所有线）线粗1mm，
“兵站”“炮站”的“十字符”的四个“L型”的8个线段，
分别与棋盘主线间距3mm，长度7mm。棋盘总尺寸，
长：410至430mm，宽：370至390mm。 -->

<script setup lang="ts">
import NumberList from "./number-list.vue";
import RecordList from "./record-list.vue";
import XiangqiPiece from "./xiangqi-piece.vue";
import { numbers, numbers_cn } from "./data";
</script>

<style lang="scss" scoped>
$lineColor: grey;
.xiangqi-box {
  position: relative;
  height: 474px;
  /* 390 + 170 */
  width: 564px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  cursor: pointer;
  user-select: none;
  background-color: aquamarine;
}

.main-box {
  height: 442px;
  width: 362px;
  border: 1px solid $lineColor;
}

.checkerboard {
  background-color: azure;
  width: 360px;
  height: 400px;

  .lattice {
    position: relative;
    width: 40px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    @mixin pseudo($w, $h) {
      position: absolute;
      content: "";
      width: $w;
      height: $h;
    }

    &::after {
      @include pseudo(100%, 1px);
      background-color: $lineColor;
    }
    &::before {
      @include pseudo(1px, 100%);
      background-color: $lineColor;
    }

    /* 横 左 */
    $w_left: 1, 10, 19, 28, 37, 46, 55, 64, 73, 82;
    @each $key in $w_left {
      &:nth-child(#{$key}) {
        &::after {
          right: 0;
          width: calc(50% + 1px);
        }
        &::before {
          width: 2px;
          right: calc(50% - 0px);
        }
      }
    }
    /* 横 右 */
    $w_right: 9, 18, 27, 36, 45, 54, 63, 72, 81, 90;
    @each $key in $w_right {
      &:nth-child(#{$key}) {
        &::after {
          left: 0px;
          width: calc(50% + 1px);
        }
        &::before {
          width: 2px;
          left: calc(50% - 0px);
        }
      }
    }
    /* 竖 上 */
    $w_top: 1, 2, 3, 4, 5, 6, 7, 8, 9;
    @each $key in $w_top {
      &:nth-child(#{$key}) {
        &::before {
          bottom: 0;
          height: calc(50% + 1px);
        }
        &::after {
          height: 2px;
          bottom: calc(50% - 1px);
        }
      }
    }
    /* 竖 下 */
    $w_down: 82, 83, 84, 85, 86, 87, 88, 89, 90;
    @each $key in $w_down {
      &:nth-child(#{$key}) {
        &::before {
          top: 0;
          height: calc(50% + 1px);
        }
        &::after {
          height: 2px;
          top: calc(50% - 0px);
        }
      }
    }

    /* 楚河汉界 */
    $ch_top: 38, 39, 40, 41, 42, 43, 44;
    @each $key in $ch_top {
      &:nth-child(#{$key})::before {
        top: 0;
        height: 50%;
      }
    }
    /* 楚河汉界 */
    $ch_down: 47, 48, 49, 50, 51, 52, 53;
    @each $key in $ch_down {
      &:nth-child(#{$key})::before {
        bottom: 0;
        height: 50%;
      }
    }

    & .lattice-line {
      display: none;
    }
    @mixin lattice-line-rotate($rotate) {
      display: inline;
      position: absolute;
      background-color: $lineColor;
      height: 1px;
      width: 56.5px;
      left: 12px;
      bottom: -1px;
      transform: rotate(#{$rotate});
      border-radius: 5px;
    }
    /* 斜线 \ */
    $slash: 4, 14, 67, 77;
    @each $key in $slash {
      &:nth-child(#{$key}) .lattice-line {
        @include lattice-line-rotate(45deg);
      }
    }
    /* 斜线 / */
    $slash: 5, 13, 68, 76;
    @each $key in $slash {
      &:nth-child(#{$key}) .lattice-line {
        @include lattice-line-rotate(-45deg);
      }
    }

    @mixin lattice-line-mixin {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 50%;
      top: 50%;
      display: inline;
    }
    @mixin lattice-line-pseudo($position1, $position2) {
      @include pseudo(7px, 7px);
      border-#{$position1}: 1px solid $lineColor;
      border-#{$position2}: 1px solid $lineColor;
      #{$position1}: 3px;
      #{$position2}: 3px;
    }
    /* 右下 */
    $position_r_b: 10, 16, 20, 22, 24, 26, 47, 49, 51, 53, 55, 61;
    @each $key in $position_r_b {
      &:nth-child(#{$key}) .lattice-line {
        @include lattice-line-mixin;
        &::after {
          @include lattice-line-pseudo(right, bottom);
        }
      }
    }

    /* 左下 */
    $position_l_b: 11, 17, 19, 21, 23, 25, 46, 48, 50, 52, 56, 62;
    @each $key in $position_l_b {
      &:nth-child(#{$key}) .lattice-line {
        @include lattice-line-mixin;
        &::after {
          @include lattice-line-pseudo(left, bottom);
        }
      }
    }

    /* 左上 */
    $position_l_t: 20, 26, 28, 30, 32, 34, 55, 57, 59, 61, 65, 71;
    @each $key in $position_l_t {
      &:nth-child(#{$key}) .lattice-line {
        @include lattice-line-mixin;
        &::before {
          @include lattice-line-pseudo(left, top);
        }
      }
    }

    /* 右上 */
    $position_r_t: 19, 25, 29, 31, 33, 35, 56, 58, 60, 62, 64, 70;
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

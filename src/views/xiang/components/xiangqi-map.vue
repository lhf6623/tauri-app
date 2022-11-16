<template>
  <div class="map-box shadow">
    <NumberList :list="numbers" />
    <div class="checkerboard">
      <ul class="lattices">
        <XiangqiPiece
          v-for="(item, index) in store.list"
          class="lattice"
          :key="index"
          @click="store.clickLattice(index, item)"
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
import { computed, onMounted } from "vue";
import { numbers, numbers_cn } from "/@xiang/utils/data";

import { useAppStore } from "/@/store/modules/xiang";

const store = useAppStore();
onMounted(() => {
  store.goEnd();
});

const tipsActive = computed(() => {
  if (!store.active.length) return [];
  let [index] = store.active;
  return store.setting.tips ? store.active : [index];
});
</script>

<style lang="scss">
@import "/@xiang/style/config.scss";

.map-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: $w * 9 + 4px;
  height: ($h * 10) + ($h_n * 2);
  transform: v-bind("store.setting.transformStyle");

  background-color: rgba(238, 211, 179, var(--bgOpacity));

  user-select: none;
  -webkit-user-select: none;

  cursor: pointer;

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
}
</style>

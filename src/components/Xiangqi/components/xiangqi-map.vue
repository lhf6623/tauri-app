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
        <XiangqiPiece :data="item" :active="active" :index="index" />
      </li>
    </ul>
    <div class="limit">楚河汉界</div>
  </div>
</template>

<script setup lang="tsx">
import XiangqiPiece from "./piece/index.vue";
import { ref, onMounted, watch, inject, Ref } from "vue";
import { piece_init_list, NULL_VALUE, COL, ROW } from "../config-data";
import { run_rule } from "../config-data/run-rule";

const active = ref<number[]>([]);
const mapList = ref<Array<PieceType | null>>(Array(COL * ROW).fill(NULL_VALUE));

onMounted(() => {
  piece_init_list.forEach((item) => {
    let { index } = item;
    mapList.value[index] = { ...item };
  });
});

const tips = inject<Ref<boolean>>("tips", ref(false));
watch(
  () => tips,
  () => {
    console.log(tips.value);
    if (active.value.length) {
      let item = mapList.value[active.value[0]];
      if (item !== NULL_VALUE) {
        let activeList = run_rule[item?.code]?.(mapList.value, item) || [];
        active.value = tips.value ? [item.index, ...activeList] : [item.index];
      }
    }
  },
  { deep: true }
);

const handleActive = (index: number, item: PieceType | null): void => {
  /* if (active.value !== null && item === NULL_VALUE) {
    let _piece = mapList.value[active.value] as PieceType;
    mapList.value[index] = { ..._piece, index };
    mapList.value[active.value] = NULL_VALUE;
    active.value = null;
  } */
  if (item !== NULL_VALUE) {
    let { code, type } = item;
    let run_lattice = run_rule[code]?.(mapList.value, item);
    console.log(`🚀 ~ run_lattice`, run_lattice);
    if (run_lattice) {
      active.value = tips.value ? [index, ...run_lattice] : [index];
    } else {
      active.value = [];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
.checkerboard {
  position: relative;
  width: calc($w * 9);
  height: calc($h * 10);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
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

    /* 横 */
    &::after {
      @include pseudo-class(100%, 1px);
      background-color: $lineColor;
      box-shadow: 0px 1px 2px 0px #fff;
    }
    &::before {
      @include pseudo-class(1px, 100%);
      background-color: $lineColor;
      box-shadow: 1px 0px 2px 0px #fff;
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

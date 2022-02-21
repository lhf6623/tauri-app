<template>
  <div>
    <div
      class="xiangqi-piece"
      :class="`${data?.type} ${pieceIsEmpty ? 'isPiece' : ''}`"
    >
      {{ data?.text }}
    </div>
    <ul class="active" v-show="active">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script setup lang="tsx">
import { PropType, computed } from "vue";
import { isEmpty } from "lodash-es";
const props = defineProps({
  data: {
    type: Object as PropType<PieceType | null>,
    default: () => ({}),
  },
  active: {
    type: Boolean,
    default: false,
  },
});
const pieceIsEmpty = computed(() => {
  return !isEmpty(props.data);
});
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
.xiangqi-piece {
  position: absolute;
  z-index: 100;
  width: calc($w - 4px);
  height: calc($h - 4px);
  top: 2px;
  left: 2px;
  border-radius: $h;
  text-align: center;
  font-weight: 700;

  &::after {
    position: absolute;
    content: "";
    width: 88%;
    height: 88%;
    top: 6%;
    left: 6%;
    border-radius: 50%;
    z-index: 10;
  }
}
.isPiece {
  box-shadow: 0px 0px 1px 1px rgb(189, 187, 187);
}
@mixin circle($color) {
  background-color: $color;
  color: white;
  &::after {
    border: 1px solid white;
  }
}
.isRed {
  @include circle($isRed);
}
.isBlack {
  @include circle($isBlack);
}

@mixin corner($position1, $position2) {
  @include pseudo(7px, 7px);
  #{$position1}: 0;
  #{$position2}: 0;
  border-#{$position1}: 1px solid black;
  border-#{$position2}: 1px solid black;
  animation: warn 900ms linear 0.4s infinite;
}
.active {
  position: absolute;
  z-index: 5;
  width: $w;
  height: $h;
  top: 0;
  left: 0;

  & > li:nth-child(1) {
    @include corner(top, left);
  }
  & > li:nth-child(2) {
    @include corner(top, right);
  }
  & > li:nth-child(3) {
    @include corner(bottom, left);
  }
  & > li:nth-child(4) {
    @include corner(bottom, right);
  }
}
@keyframes warn {
  0% {
    opacity: 1;
  }
  30% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

<template>
  <ul class="active absolute top-0 left-0">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";
@mixin corner($name, $position1, $position2) {
  @include pseudo-class(7px, 7px);
  #{$position1}: 1px;
  #{$position2}: 1px;
  border-#{$position1}: 1px solid v-bind("props.color");

  border-#{$position2}: 1px solid v-bind("props.color");

  animation: $name 1s linear 0.4s infinite;
}
.active {
  z-index: 5;
  width: $w;
  height: $h;

  & > li:nth-child(1) {
    @include corner(warn, top, left);
  }
  & > li:nth-child(2) {
    @include corner(warn, top, right);
  }
  & > li:nth-child(3) {
    @include corner(warn, bottom, left);
  }
  & > li:nth-child(4) {
    @include corner(warn, bottom, right);
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

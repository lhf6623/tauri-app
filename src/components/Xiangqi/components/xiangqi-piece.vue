<template>
  <div>
    <div v-show="pieceIsEmpty" class="xiangqi-piece" :class="`${data?.type}`">
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
    type: Object as PropType<PieceType>,
    default: () => ({}),
  },
  active: {
    type: Boolean,
    default: true,
  },
});
const pieceIsEmpty = computed(() => {
  return !isEmpty(props.data);
});
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
@import "../style/xiangqi-piece.scss";
</style>

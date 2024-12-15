<template>
  <div :class="`piece-box  ${pieceClaRef}`">
    <!-- 斜线 和兵、炮位置-->
    <i v-if="claRef" :class="claRef"></i>
    <!-- 棋子 -->
    <div class="w-36px h-36px z-100 relative">
      <div
        v-show="data"
        :class="`absolute shadow text-center text-white text-20px w-34px h-34px leading-34px top-1px left-1px rounded-full z-99 ${
          props.data?.type === RED ? 'bg-#ff0000' : 'bg-#000'
        }`"
      >
        {{ data?.text }}
        {{ data?.index }}
      </div>
      <Active v-show="showActive" :color="activeColor" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { type PropType, computed } from 'vue';
  import { Active } from './common';
  import { RED } from '@/utils/data';

  const props = defineProps({
    data: {
      type: Object as PropType<PieceType | null>,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
    active: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
  });

  const activeColor = computed(() => {
    const isRed = props.active.findIndex((item) => item === props.index) === 0;
    return isRed ? 'red' : 'black';
  });

  const showActive = computed(() => {
    return props.active.includes(props.index);
  });

  // @unocss-include
  const pieceCla = {
    // 横线 左右
    1: `!after:(right-0px w-19px h-1px bottom-18px) !before:(w-1px right-18px bottom-0 h-18px)`,
    10: `!after:(right-0px w-19px) !before:(w-1px right-18px)`,
    19: `!after:(right-0px w-19px) !before:(w-1px right-18px)`,
    28: `!after:(right-0px w-19px) !before:(w-1px right-18px)`,
    37: `!after:(right-0px w-19px) !before:(w-1px right-18px)`,
    46: `!after:(right-0px w-19px) !before:(w-1px right-18px)`,
    55: `!after:(right-0px w-19px) !before:(w-1px right-18px)`,
    64: `!after:(right-0px w-19px) !before:(w-1px right-18px)`,
    73: `!after:(right-0px w-19px) !before:(w-1px right-18px)`,
    82: `!after:(right-0px w-19px h-1px top-18px) !before:(w-1px right-18px top-0 h-18px)`,
    9: `!after:(left-0px w-19px h-1px bottom-18px) !before:(w-1px left-18px bottom-0 h-18px)`,
    18: `!after:(left-0px w-19px) !before:(w-1px left-18px)`,
    27: `!after:(left-0px w-19px) !before:(w-1px left-18px)`,
    36: `!after:(left-0px w-19px) !before:(w-1px left-18px)`,
    45: `!after:(left-0px w-19px) !before:(w-1px left-18px)`,
    54: `!after:(left-0px w-19px) !before:(w-1px left-18px)`,
    63: `!after:(left-0px w-19px) !before:(w-1px left-18px)`,
    72: `!after:(left-0px w-19px) !before:(w-1px left-18px)`,
    81: `!after:(left-0px w-19px) !before:(w-1px left-18px)`,
    90: `!after:(left-0px w-19px h-1px top-18px) !before:(w-1px left-18px top-0 h-18px)`,
    // 竖线 上下
    2: `!after:(h-1px bottom-18px) !before:(bottom-0 h-18px)`,
    3: `!after:(h-1px bottom-18px) !before:(bottom-0 h-18px)`,
    4: `!after:(h-1px bottom-18px) !before:(bottom-0 h-18px)`,
    5: `!after:(h-1px bottom-18px) !before:(bottom-0 h-18px)`,
    6: `!after:(h-1px bottom-18px) !before:(bottom-0 h-18px)`,
    7: `!after:(h-1px bottom-18px) !before:(bottom-0 h-18px)`,
    8: `!after:(h-1px bottom-18px) !before:(bottom-0 h-18px)`,
    83: `!after:(h-1px top-18px) !before:(top-0 h-18px)`,
    84: `!after:(h-1px top-18px) !before:(top-0 h-18px)`,
    85: `!after:(h-1px top-18px) !before:(top-0 h-18px)`,
    86: `!after:(h-1px top-18px) !before:(top-0 h-18px)`,
    87: `!after:(h-1px top-18px) !before:(top-0 h-18px)`,
    88: `!after:(h-1px top-18px) !before:(top-0 h-18px)`,
    89: `!after:(h-1px top-18px) !before:(top-0 h-18px)`,
    // 楚河汉界
    38: `!before:(top-0 h-18px)`,
    39: `!before:(top-0 h-18px)`,
    40: `!before:(top-0 h-18px)`,
    41: `!before:(top-0 h-18px)`,
    42: `!before:(top-0 h-18px)`,
    43: `!before:(top-0 h-18px)`,
    44: `!before:(top-0 h-18px)`,
    47: `!before:(bottom-0 h-18px)`,
    48: `!before:(bottom-0 h-18px)`,
    49: `!before:(bottom-0 h-18px)`,
    50: `!before:(bottom-0 h-18px)`,
    51: `!before:(bottom-0 h-18px)`,
    52: `!before:(bottom-0 h-18px)`,
    53: `!before:(bottom-0 h-18px)`,
  };

  type PieceClaKey = keyof typeof pieceCla;
  const pieceClaRef = computed(() => {
    return pieceCla[(props.index + 1) as PieceClaKey] ?? '';
  });

  // @unocss-include
  const cla = {
    // 斜线
    4: `bias-45`,
    14: `bias-45`,
    67: `bias-45`,
    77: `bias-45`,
    5: `bias--45`,
    13: `bias--45`,
    68: `bias--45`,
    76: `bias--45`,
    // 星位置
    10: `star-after-r-b`,
    16: `star-after-r-b`,
    20: `star-after-r-b star-before-l-t`,
    22: `star-after-r-b`,
    24: `star-after-r-b`,
    26: `star-after-r-b star-before-l-t`,
    47: `star-after-r-b`,
    49: `star-after-r-b`,
    51: `star-after-r-b`,
    53: `star-after-r-b`,
    55: `star-after-r-b star-before-l-t`,
    61: `star-after-r-b star-before-l-t`,
    11: `star-after-l-b`,
    17: `star-after-l-b`,
    19: `star-after-l-b star-before-r-t`,
    21: `star-after-l-b`,
    23: `star-after-l-b`,
    25: `star-after-l-b star-before-r-t`,
    46: `star-after-l-b`,
    48: `star-after-l-b`,
    50: `star-after-l-b`,
    52: `star-after-l-b`,
    56: `star-after-l-b star-before-r-t`,
    62: `star-after-l-b star-before-r-t`,
    28: `star-before-l-t`,
    30: `star-before-l-t`,
    32: `star-before-l-t`,
    34: `star-before-l-t`,
    57: `star-before-l-t`,
    59: `star-before-l-t`,
    65: `star-before-l-t`,
    71: `star-before-l-t`,
    29: `star-before-r-t`,
    31: `star-before-r-t`,
    33: `star-before-r-t`,
    35: `star-before-r-t`,
    58: `star-before-r-t`,
    60: `star-before-r-t`,
    64: `star-before-r-t`,
    70: `star-before-r-t`,
  };

  type ClaKey = keyof typeof cla;
  const claRef = computed(() => {
    return cla[(props.index + 1) as ClaKey] ?? '';
  });
</script>

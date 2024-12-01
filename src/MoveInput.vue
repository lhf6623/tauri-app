<template>
  <div
    :class="`${
      isExpand ? 'shadow' : ''
    } text-12px rounded-b-3px w-172px min-h-22px max-h-210px`"
  >
    <div
      :class="`${
        isExpand
          ? 'bg-#99ddff h-24px flex-end'
          : 'bg-transparent h-22px flex-between'
      } px-6px flex-shrink-0 overflow-hidden`"
    >
      <NButton
        v-show="!isExpand"
        size="tiny"
        circle
        type="info"
        class="shadow"
        :color="isRed"
      ></NButton>

      <NButton size="tiny" type="info" text @click="isExpand = !isExpand">
        <template #icon>
          <i
            :class="`${
              isExpand
                ? 'i-icon-park-outline:expand-down'
                : 'i-icon-park-outline:expand-up'
            }`"
          ></i>
        </template>
      </NButton>
    </div>
    <NCollapseTransition :show="isExpand">
      <div class="bg-white relative w-full">
        <!-- {/* 棋子文字 */} -->
        <div class="flex-around pt-4px w-full">
          <NButton
            class="shadow"
            :color="isRed"
            size="tiny"
            v-for="item in pieceTexts"
            :key="item.text"
          >
            {{ item.text }}
          </NButton>
        </div>
        <!-- {/* 第一个字和第三个字 */} -->
        <div class="flex-center gap-1px pt-4px">
          <NButton
            class="shadow"
            size="tiny"
            type="info"
            v-for="item in firstAndThird"
            :key="item"
          >
            {{ item }}
          </NButton>
        </div>
        <!-- {/* 中文数字和数字 */} -->
        <div class="flex-center gap-1px flex-wrap gap-2px pt-4px">
          <NButton
            class="!w-26px shadow"
            size="tiny"
            v-for="item in numberText"
            :key="item"
          >
            {{ item }}
          </NButton>
        </div>
        <!-- {/* 输入框 */} -->
        <div class="flex-center pt-4px px-2px">
          <NInput size="small" placeholder="请输入" clearable />
        </div>
        <!-- {/* 确认输入 */} -->
        <div class="flex-center py-4px">
          <NButton size="small" class="shadow" type="primary">
            确认输入
          </NButton>
        </div>
      </div>
    </NCollapseTransition>
  </div>
</template>

<script setup lang="ts">
  import { NCollapseTransition, NButton, NInput } from 'naive-ui';
  import { useAppStore } from '@/store';
  import {
    numbers,
    numbers_cn,
    text1,
    text3,
    RED,
    piece_list,
  } from '@/utils/data';
  import { computed, ref } from 'vue';

  const isExpand = ref(false);
  // 排序
  const sort_code = ['jiang', 'shi', 'xiang', 'ma', 'che', 'pao', 'bing'];
  const store = useAppStore();
  // 棋子文字
  const pieceTexts = computed(() => {
    const list = store.record[store.record_index]?.list ?? piece_list;
    const texts = list
      .reduce((pre, item) => {
        // 过滤同一阵营的棋子
        if (item.type === store.next) return pre;
        // 过滤相同的棋子
        if (pre.find((pre_item) => pre_item.code === item.code)) return pre;

        return [...pre, item];
      }, [] as PieceType[])
      .sort((a, b) => {
        return sort_code.indexOf(a.code) - sort_code.indexOf(b.code);
      });

    return texts;
  });
  // 第一个和第三个字
  const firstAndThird = computed(() => {
    return [...text1, ...text3];
  });
  // 中文数字和数字
  const numberText = computed(() => {
    return store.next === RED ? numbers_cn : numbers;
  });

  const isRed = computed(() => {
    return store.next === RED ? 'red' : 'black';
  });
</script>

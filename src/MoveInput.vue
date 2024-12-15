<template>
  <div
    :class="`${
      isExpand ? 'shadow' : ''
    } text-12px rounded-b-3px w-full overflow-hidden min-h-22px max-h-210px`"
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
                ? 'i-lets-icons:expand-down-double'
                : 'i-lets-icons:expand-up-double'
            }`"
          ></i>
        </template>
      </NButton>
    </div>
    <NCollapseTransition :show="isExpand">
      <div class="bg-white relative">
        <div class="flex-center gap-x-1px py-3px h-22px b-b box-content">
          <NButton
            class="shadow"
            :color="isRed"
            size="tiny"
            v-for="item in pieceTexts"
            :key="item.text"
            @click="setText(item.text)"
          >
            {{ item.text }}
          </NButton>
        </div>
        <div class="flex-center gap-x-1px py-3px h-22px b-b box-content">
          <NButton
            class="shadow"
            size="tiny"
            type="info"
            v-for="item in firstAndThird"
            :key="item"
            @click="setText(item)"
          >
            {{ item }}
          </NButton>
        </div>
        <div
          class="flex-center flex-wrap gap-x-1px py-3px min-h-22px b-b box-content"
        >
          <NButton
            class="!w-26px shadow"
            size="tiny"
            v-for="item in numberText"
            :key="item"
            @click="setText(item)"
          >
            {{ item }}
          </NButton>
        </div>
        <div class="flex-center p-4px">
          <NInputGroup>
            <NInput
              size="tiny"
              v-model:value="text"
              placeholder="请输入"
              :clearable="false"
              disabled
            >
              <template #suffix>
                <NButton
                  type="primary"
                  title="回退"
                  @click="back"
                  text
                  size="tiny"
                  v-show="text.length"
                >
                  <i class="i-icon-park-outline:back"></i>
                </NButton>
              </template>
            </NInput>
            <NButton type="primary" size="tiny" title="确认" ghost>
              <i class="i-solar:play-bold"></i>
            </NButton>
          </NInputGroup>
        </div>
      </div>
    </NCollapseTransition>
  </div>
</template>

<script setup lang="ts">
  import { NCollapseTransition, NButton, NInput, NInputGroup } from 'naive-ui';
  import { useAppStore } from '@/store';
  import {
    numbers,
    numbers_cn,
    text1,
    text3,
    piece_list,
    isRED,
  } from '@/utils/data';
  import { computed, ref, watch } from 'vue';
  import useRunChess from '@/useRunChess';

  const isExpand = ref(true);
  // 排序
  const sort_code = ['jiang', 'shi', 'xiang', 'ma', 'che', 'pao', 'bing'];
  const store = useAppStore();
  const { text, active, setText, back, nextText } = useRunChess();

  watch(
    () => active,
    (newValue) => {
      store.active = newValue.value;
    },
    { deep: true }
  );
  // 棋子文字
  const pieceTexts = computed(() => {
    const list = store.record[store.record_index]?.list ?? piece_list;

    return list
      .reduce((pre, item) => {
        // 过滤同一阵营的棋子
        if (item.type !== store.next) return pre;
        // 过滤相同的棋子
        if (pre.find((pre_item) => pre_item.code === item.code)) return pre;

        return [...pre, item];
      }, [] as PieceType[])
      .sort((a, b) => {
        return sort_code.indexOf(a.code) - sort_code.indexOf(b.code);
      })
      .flatMap((item) => (nextText.value.includes(item.text) ? [item] : []));
  });
  // 第一个和第三个字
  const firstAndThird = computed(() => {
    const texts = [...text1, ...text3];
    return texts.flatMap((item) =>
      nextText.value.includes(item) ? [item] : []
    );
  });
  // 中文数字和数字
  const numberText = computed(() => {
    const num = isRED(store.next) ? numbers_cn : numbers;
    return num.flatMap((item) => (nextText.value.includes(item) ? [item] : []));
  });

  const isRed = computed(() => {
    return isRED(store.next) ? 'red' : 'black';
  });
</script>

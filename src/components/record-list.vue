<template>
  <div class="record-list shadow">
    <header>棋谱序列</header>
    <NScrollbar ref="scrollbarRef" class="flex-1">
      <ul ref="recordListRef" class="text-center cursor-default">
        <li :class="activeItem === 0 ? `active` : ''">
          <span>===棋局开始===</span>
        </li>
        <li
          class="flex text-center justify-center"
          v-for="(item, index) in store.record"
          :class="activeItem === index + 1 ? `active` : ''"
        >
          <p class="inline-block">
            {{ index % 2 ? "&nbsp;&nbsp;" : `${index / 2 + 1}.` }}
          </p>
          <p class="flex min-w-50px justify-between tabular-nums">
            <span v-for="texts in item">{{ texts }}</span>
          </p>
        </li>
      </ul>
    </NScrollbar>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { NScrollbar, ScrollbarInst } from "naive-ui";
import { useGlobalState } from "../vueuse/store";
import { MaybeElement, useElementSize } from "@vueuse/core";

const recordListRef = ref<MaybeElement>();
const scrollbarRef = ref<ScrollbarInst | null>(null);

const store = useGlobalState();

const activeItem = computed(() => store.value.record.length);

const { height } = useElementSize(recordListRef);
watch(
  () => height,
  () => {
    scrollbarRef.value?.scrollBy({
      top: height.value,
      behavior: "smooth",
    });
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";
.record-list {
  display: flex;
  flex-direction: column;
  background-color: white;
  font-size: 12px;

  overflow: hidden;
  width: 106px;
  z-index: 50;
  height: ($h * 10) + ($h_n * 2);

  header,
  footer {
    background-color: #9df;
    padding: 0 6px;
    height: 18px;
    flex-shrink: 0;
  }

  .active {
    background-color: rgb(49, 106, 197);
    color: white;
  }
}
</style>

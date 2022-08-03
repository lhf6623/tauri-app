<template>
  <div class="record-list shadow">
    <header>棋谱序列</header>
    <NScrollbar ref="scrollbarRef" class="flex-1">
      <ul ref="recordListRef" class="text-center">
        <li :class="store.getRecordLen === 0 ? `active` : ''">
          <span>===棋局开始===</span>
        </li>
        <li
          class="flex text-center justify-center"
          v-for="(item, index) in store.record"
          :class="store.getRecordLen === index + 1 ? `active` : ''"
          @click="handleActive(index)"
        >
          <p class="inline-block">
            {{ index % 2 ? "&nbsp;&nbsp;" : `${index / 2 + 1}.` }}
          </p>
          <p class="flex min-w-50px justify-between tabular-nums">
            <span v-for="texts in item.name">{{ texts }}</span>
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
import { useAppStore } from "@/store/modules/app";
import { MaybeElement, useElementSize } from "@vueuse/core";
import { BackBus } from "@/vueuse/event-bus";

const recordListRef = ref<MaybeElement>();
const scrollbarRef = ref<ScrollbarInst | null>(null);

const store = useAppStore();

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

const handleActive = (index: number) => {
  BackBus.emit(index);
};
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";
.record-list {
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, var(--bgOpacity));
  font-size: 12px;

  overflow: hidden;
  width: 106px;
  z-index: 50;
  height: ($h * 10) + ($h_n * 2);

  header,
  footer {
    background-color: rgba(153, 221, 255, var(--bgOpacity));
    padding: 0 6px;
    height: 18px;
    flex-shrink: 0;
  }

  .active {
    background-color: rgba(0, 98, 255, 0.6);
    color: rgb(255, 255, 255);
  }
}
</style>

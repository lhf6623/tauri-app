<template>
  <div class="record-list flex flex-col bg-white font-s">
    <header class="px-6px h-18px flex-shrink-0 flex justify-between">
      <span>棋谱序列</span>
      <span class="cursor-pointer" @click="changeRecordType"
        >[{{ store.recordType ? "下棋" : "读谱" }}]</span
      >
    </header>
    <NScrollbar ref="scrollbarRef">
      <ul
        ref="recordListRef"
        class="text-center"
        :class="`cursor-${store.recordType ? 'default' : 'pointer'}`"
      >
        <li :class="activeItem === 0 ? `active` : ''" @click="handleHistory(0)">
          <span>===棋局开始===</span>
        </li>
        <li
          class="flex text-center justify-center"
          v-for="(item, index) in store.record"
          @click="handleHistory(index + 1)"
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
    <footer class="px-6px h-18px flex-shrink-0"></footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { NScrollbar, ScrollbarInst } from "naive-ui";
import { useGlobalState } from "../vueuse/store";
import { MaybeElement, useElementSize } from "@vueuse/core";
import { historyBus } from "../vueuse/event-bus";

const recordListRef = ref<MaybeElement>();
const scrollbarRef = ref<ScrollbarInst | null>(null);

const store = useGlobalState();

const activeItem = computed(() => {
  let { recordActive, record, recordType } = store.value;
  return recordType ? record.length : recordActive;
});

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

const handleHistory = (index: number) => {
  if (store.value.recordType) return;
  historyBus.emit(index);
};

const changeRecordType = () => {
  let { recordType, record } = store.value;
  store.value.recordType = !recordType;
  store.value.recordActive = record.length;
};
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
.record-list {
  font-size: 12px;

  header,
  footer {
    background-color: #9df;
  }

  .active {
    background-color: rgb(49, 106, 197);
    color: white;
  }
}
</style>

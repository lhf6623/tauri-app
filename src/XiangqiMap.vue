<template>
  <div
    class="shadow relative flex flex-col items-center w-324px h-400px bg-#eed3b3 select-none cursor-pointer"
  >
    <NumberList :list="numbers" />
    <div
      class="relative w-324px h-360px after-absolute after:(content-[''] w-300px left-12px h-336px top-12px b b-2px b-solid b-#000) relative flex flex-wrap"
    >
      <XiangqiPiece
        v-for="(item, index) in store.list"
        :key="index"
        @click="store.clickLattice(index, item)"
        :data="item"
        :active="tipsActive"
        :index="index"
      />
      <Rivers />
    </div>
    <NumberList :list="numbers_cn" />
  </div>
</template>

<script setup lang="tsx">
  import XiangqiPiece from './XiangqiPiece.vue';
  import { computed, onMounted } from 'vue';
  import { numbers, numbers_cn } from '@/utils/data';
  import { Rivers, NumberList } from './common';

  import { useAppStore } from '@/store';

  const store = useAppStore();
  onMounted(() => {
    store.readRecord(store.record.length - 1);
  });

  const tipsActive = computed(() => {
    if (!store.active.length) return [];
    return store.active;
  });
</script>

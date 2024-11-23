<template>
  <footer class="footer-text">
    <NButton size="tiny" type="info" @click="handleReset">重新开始</NButton>
    <NButton type="info" size="tiny">下棋方：{{ nextText }}</NButton>
    <span></span>
  </footer>
</template>

<script setup lang="ts">
  import { NButton } from 'naive-ui';
  import { useAppStore } from '@/store/xiang';
  import { computed } from 'vue';
  import { RED } from '@/utils/data';

  const store = useAppStore();

  const nextText = computed(() => {
    let { next } = store;
    return next === RED ? '红方' : '黑方';
  });

  const handleReset = store.refreshGame;
</script>

<style lang="scss" scoped>
  @import '@/config.scss';

  .footer-text {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 22px;
    margin-top: 4px;
    font-size: 12px;
    width: 100%;
  }
</style>

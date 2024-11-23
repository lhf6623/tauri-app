<template>
  <NConfigProvider abstract preflight-style-disabled>
    <div class="xiangqi-box-full">
      <div class="xiangqi-box shadow" id="xiangqi-box">
        <section>
          <Maps />
          <Records />
        </section>
        <Control />
      </div>
    </div>
    <NGlobalStyle />
  </NConfigProvider>
</template>
<script setup lang="ts">
  import { NConfigProvider, NGlobalStyle } from 'naive-ui';
  import { onMounted } from 'vue';
  import { Records, Maps, Control } from '@/components';

  onMounted(() => {
    // 禁止右键
    document.oncontextmenu = function (e) {
      if (import.meta.env.PROD) {
        e.preventDefault();
      }
    };
  });
</script>

<style lang="scss" scoped>
  @import '@/config.scss';

  .xiangqi-box-full {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 2s;

    section {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  .xiangqi-box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    padding: 5px;
    width: $w * 9 + 8px + 106px + 10px;
    height: $h * 10 + $h_n * 2 + 4px + 22px + 10px;
    background-color: rgba(153, 204, 255, 1);
    font-size: 16px;
    color: black;
  }
</style>

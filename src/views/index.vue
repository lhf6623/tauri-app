<template>
  <!-- @contextmenu.prevent.self -->
  <div class="xiangqi-box-full" :style="{ '--bgOpacity': bgOpacity }">
    <div class="xiangqi-box shadow" id="xiangqi-box">
      <section>
        <Maps />
        <Records />
      </section>
      <Control />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Records, Maps, Control } from "@/components";
import { useAppStore } from "@/store/modules/app";

const store = useAppStore();
const bgOpacity = computed(() => store.setting.bgOpacity / 100);
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";

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
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  padding: 5px;
  width: $w * 9 + 8px + 106px + 10px;
  height: $h * 10 + $h_n * 2 + 4px + 22px + 10px;
  background-color: rgba(153, 204, 255, var(--bgOpacity));
  font-size: 16px;
  color: black;
}
</style>

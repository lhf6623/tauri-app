<template>
  <div
    class="xiangqi-box-full"
    :style="{ '--bgOpacity': bgOpacity }"
    @contextmenu.prevent.self
  >
    <TitleBar />
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
import { onMounted, computed } from "vue";
import { Records, Maps, Control } from "@/components";
import { initChessGame, useGlobalState } from "@/vueuse/store";
import TitleBar from "@/components/title-bar.vue";

onMounted(initChessGame);

const store = useGlobalState();
const bgOpacity = computed(() => {
  return store.value.setting.bgOpacity / 100 || 0.1;
});
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
  padding-top: $titlebarHeight;

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
  background-color: rgb(153, 204, 255, var(--bgOpacity));
  font-size: 16px;
  color: black;
}
</style>

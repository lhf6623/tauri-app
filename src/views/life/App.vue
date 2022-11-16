<template>
  <NConfigProvider abstract preflight-style-disabled>
    <ul class="life-layou">
      <li
        v-for="(item, index) in lifeList"
        :key="index"
        :class="{ isLive: item === true }"
      ></li>
    </ul>
    <NGlobalStyle />
  </NConfigProvider>
</template>
<script setup lang="ts">
import { Ref, ref } from "vue";
import { NConfigProvider, NGlobalStyle } from "naive-ui";
import { getRandom, COL, ROW, SIZE, RANDOM, getAroundState } from "./utils";
// import SettingForm from './setting-form.vue'

let randomList: number[] = getRandom(COL * ROW - 1, RANDOM);

const lifeList: Ref<boolean[]> = ref(Array(COL * ROW).fill(false));

randomList.forEach(i => {
  lifeList.value[i] = true;
});

let total = 1000,
  _i = 0;
function live() {
  const _lifeList: boolean[] = [];
  lifeList.value.forEach((ele, i) => {
    const state = getAroundState(i, ele, lifeList.value);
    _lifeList.push(state);
  });
  lifeList.value = _lifeList;
  _i += 1;
  if (_i > total) return;
  setTimeout(live, 100);
}
setTimeout(live, 100);
</script>

<style scoped lang="scss">
$lineColor: #d1d0d0;
.life-layou {
  position: relative;
  display: flex;
  flex-direction: row;
  min-width: calc(v-bind(ROW) * v-bind(SIZE));
  max-width: calc(v-bind(ROW) * v-bind(SIZE));
  min-height: calc(v-bind(COL) * v-bind(SIZE));
  max-height: calc(v-bind(COL) * v-bind(SIZE));
  flex-wrap: wrap;
  user-select: none;

  &::after {
    position: absolute;
    content: "";
    border-top: 1px solid $lineColor;
    border-left: 1px solid $lineColor;
    width: 100%;
    height: 100%;
  }
  li {
    position: relative;
    width: v-bind(SIZE);
    height: v-bind(SIZE);
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;

    &::after {
      position: absolute;
      content: "";
      border-bottom: 1px solid $lineColor;
      border-right: 1px solid $lineColor;
      width: 100%;
      height: 100%;
    }
  }

  .isLive {
    background-color: black;
  }
}
</style>

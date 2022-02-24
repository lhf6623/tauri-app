<template>
  <div class="xiangqi-box">
    <section>
      <div class="map-box">
        <Numbers :list="numbers" />
        <Maps />
        <Numbers :list="numbers_cn" />
      </div>
      <Records class="records-box" v-if="true" />
    </section>
    <ActionBar />
  </div>
</template>

<script setup lang="ts">
import { type } from "os";
import { provide, ref, watch, onMounted } from "vue";
import { Numbers, Records, Maps, ActionBar } from "./components";
import { numbers, numbers_cn, XIANGQI_LOCA_KEY } from "./config-data";
const store = ref<StoreType>({
  tips: false,
  reset: false,
});

provide("store", store);
provide("changeTips", (tipsValue: boolean) => {
  store.value.tips = tipsValue;
});
provide("changeReset", (resetValue: boolean) => {
  console.log(`🚀 ~ resetValue`, resetValue);
  store.value.reset = resetValue;
});
onMounted(() => {
  let _store = JSON.parse(localStorage.getItem(XIANGQI_LOCA_KEY) || "") || {};
  store.value = _store.value;
});

watch(
  () => store,
  () => {
    localStorage.setItem(
      XIANGQI_LOCA_KEY,
      JSON.stringify({ value: store.value })
    );
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
@import "./style/config.scss";
.xiangqi-box {
  position: relative;
  width: calc($w * 9 + 4px + 106px + 10px);
  height: calc($h * 11 + 4px + 22px + 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: $mainColor;
  font-size: calc($w * 0.5);
  font-family: 宋体, 新宋体, "MS Song", SimSun, NSimSun;
}
footer {
  width: calc(100% - 10px);
  height: 22px;
  margin-top: 4px;
}
section {
  display: flex;
  flex-direction: row;
  width: calc($w * 9 + 4px + 106px);
  justify-content: space-between;
}

.map-box {
  width: calc($w * 9);
  height: calc($h * 11);
  box-shadow: 0px 0px 2px #000000;
  border-radius: 2px;
  overflow: hidden;
}
.records-box {
  width: 106px;
  height: calc($h * 11);
  box-shadow: 0px 0px 2px #000000;
  border-radius: 2px;
  overflow: hidden;
}
</style>

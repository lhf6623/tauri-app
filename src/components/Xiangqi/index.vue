<template>
  <div class="xiangqi-box">
    <section>
      <div class="map-box">
        <Numbers :list="numbers" :type="'isBlack'" />
        <Maps />
        <Numbers :list="numbers_cn" :type="'isRed'" />
      </div>
      <Records class="records-box" v-if="true" />
    </section>
    <ActionBar />
  </div>
</template>

<script setup lang="ts">
import { Numbers, Records, Maps, ActionBar } from "./components";
import { numbers, numbers_cn } from "./data";
</script>

<style lang="scss" scoped>
@import "./style/config.scss";
@import "./style/index.scss";
</style>

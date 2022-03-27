<template>
  <div
    class="shadow-sm m-1 px-1 pb-1 rounded-sm overflow-hidden border hover:shadow-md transition duration-300"
  >
    <h1 class="card-title font-bold mb-1 border-b py-1">
      <span>{{ title }}</span>
      <NIcon
        :component="Link"
        class="sticky-top cursor-pointer ml-1 align-middle"
        color="#4682BE"
      />
      <NIcon
        :component="ArrowBigTop"
        class="back-top cursor-pointer ml-1 align-middle"
        color="#4682BE"
      />
    </h1>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { NIcon } from "naive-ui";
import { Link } from "@vicons/carbon";
import { ArrowBigTop } from "@vicons/tabler";
defineProps({
  title: {
    typre: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.card-title:hover {
  color: rgba(248, 113, 113, $alpha: 1);

  .sticky-top,
  .back-top {
    display: inline-block;
  }
}
</style>

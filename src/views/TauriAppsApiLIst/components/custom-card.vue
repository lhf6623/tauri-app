<template>
  <div
    class="shadow-sm m-1 px-1 pb-1 rounded-sm overflow-hidden border hover:shadow-md transition duration-300"
    ref="cardRef"
  >
    <h1 class="card-title mb-1 border-b py-1">
      <span class="font-bold">{{ title }}</span>
      <NIcon
        :component="Link"
        class="sticky-top hidden cursor-pointer ml-1 align-middle select-none"
        color="#4682BE"
        @click="handleItemToTop"
      />
      <NIcon
        :component="ArrowBigTop"
        class="back-top hidden cursor-pointer ml-1 align-middle select-none"
        color="#4682BE"
        @click="handleToTop"
      />
    </h1>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { NIcon } from "naive-ui";
import { Link } from "@vicons/carbon";
import { ArrowBigTop } from "@vicons/tabler";
import { ref, inject, computed } from "vue";
import { MaybeElement, useElementBounding } from "@vueuse/core";

defineProps({
  title: {
    typre: String,
    default: "",
  },
});
const cardRef = ref<MaybeElement>();
const scrollFn = inject("scrollFn") as (
  n: number,
  type: "scrollBy" | "scrollTo"
) => void;
let { top } = useElementBounding(cardRef);
const _top = computed(() => {
  return top.value;
});
/**
 * 把单个卡片置顶
 */
const handleItemToTop = () => {
  scrollFn(_top.value, "scrollBy");
};
/**
 * 回到顶部
 */
const handleToTop = () => {
  scrollFn(0, "scrollTo");
};
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

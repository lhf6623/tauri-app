<template>
  <NButton size="tiny" type="info" quaternary @click="handleChangeTips">
    <template #icon>
      <NIcon :component="store.tips ? AlertCircleSharp : AlertCircleOutline" />
    </template>
  </NButton>
</template>

<script setup lang="ts">
import { inject, ref, Ref } from "vue";
import { NButton, NIcon } from "naive-ui";
import { AlertCircleSharp, AlertCircleOutline } from "@vicons/ionicons5";
import { useEventBus } from "@vueuse/core";
import { ShowTipsKey } from "../../vueuse/event-bus-key";

const store = inject<Ref<StoreType>>("store", ref({ tips: false }));

const tipsBus = useEventBus(ShowTipsKey);

function handleChangeTips() {
  tipsBus.emit(!store.value.tips);
}
</script>

<template>
  <NButton
    size="tiny"
    type="info"
    circle
    quaternary
    :focusable="false"
    @click="showDrawerFn"
  >
    <template #icon>
      <i class="i-mdi:cog-outline" />
    </template>
  </NButton>
  <NDrawer
    v-model:show="showDrawer"
    :width="150"
    :placement="placement"
    show-mask="transparent"
    display-directive="show"
  >
    <NDrawerContent
      title="设置"
      closable
      header-style="padding: 6px 12px"
      body-content-style="padding-top: 6px"
    >
      <SettingList />
    </NDrawerContent>
  </NDrawer>
</template>

<script setup lang="tsx">
import { NDrawer, NDrawerContent, NButton } from "naive-ui";
import SettingList from "./setting-list";
import type { DrawerPlacement } from "naive-ui";
import { ref } from "vue";

const showDrawer = ref(false);
const placement = ref<DrawerPlacement>("right");

function showDrawerFn() {
  showDrawer.value = true;
}
</script>

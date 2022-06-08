<template>
  <NButton size="tiny" type="info" circle quaternary @click="showDrawerFn">
    <template #icon>
      <NIcon :component="Settings" />
    </template>
  </NButton>
  <NDrawer
    v-model:show="showDrawer"
    :width="150"
    :placement="placement"
    to="#xiangqi-box"
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
import { NDrawer, NDrawerContent, NButton, NIcon } from "naive-ui";
import SettingList from "./setting-list";
import type { DrawerPlacement } from "naive-ui";
import { ref } from "vue";
import { Settings } from "@vicons/ionicons5";

const showDrawer = ref(false);
const placement = ref<DrawerPlacement>("right");

function showDrawerFn() {
  showDrawer.value = true;
}
</script>

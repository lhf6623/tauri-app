<template>
  <NButton size="tiny" type="info" quaternary @click="toggleDark()">
    <template #icon>
      <NIcon :component="isDark ? SunnySharp : Moon" />
    </template>
  </NButton>
</template>

<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import { SunnySharp, Moon } from "@vicons/ionicons5";
import { useToggle } from "@vueuse/core";

import { isDark } from "../../vueuse/dark";
const toggleDark = useToggle(isDark);
</script>

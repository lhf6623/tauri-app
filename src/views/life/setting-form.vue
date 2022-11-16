<template>
  <NForm ref="formRef" inline :label-width="80" :model="formValue">
    <NFormItem class="w-300px" label="颜色" path="life.color">
      <NColorPicker v-model:value="formValue.color" :show-alpha="false" />
    </NFormItem>
  </NForm>
</template>

<script setup lang="ts">
import { NForm, NFormItem, NColorPicker } from "naive-ui";
import { ref } from "vue";

const formRef = ref(null);
const formValue = ref({
  color: "#b4b4b4",
});
</script>

import { defineComponent } from "vue";
import { NSwitch, NSpace, NSlider } from "naive-ui";
import { useGlobalState } from "@/vueuse/store";

export default defineComponent({
  name: "SettingList",
  setup() {
    const store = useGlobalState();

    return () => (
      <NSpace vertical={true}>
        <p class="flex flex-col justify-between items-center">
          <span>透明度</span>
          <NSlider
            step={1}
            tooltip={false}
            v-model={[store.value.setting.bgOpacity, "value"]}
            onUpdateValue={(value: number) => {
              store.value.setting.bgOpacity = value;
            }}
          />
        </p>
        <p class="flex justify-between items-center">
          <span>提示</span>
          <NSwitch
            size="small"
            v-slots={{
              checked: () => "开",
              unchecked: () => "关",
            }}
            v-model={[store.value.setting.tips, "value"]}
            onUpdateValue={(value: boolean) => {
              store.value.setting.tips = value;
            }}
          />
        </p>
      </NSpace>
    );
  },
});

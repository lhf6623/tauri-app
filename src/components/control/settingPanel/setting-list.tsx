import { defineComponent, computed } from "vue";
import { NSwitch, NSpace, NSlider, NIconWrapper, NIcon } from "naive-ui";
import { useGlobalState } from "@/vueuse/store";
import { Moon, MoonOutline, SunnyOutline, Sunny } from "@vicons/ionicons5";

export default defineComponent({
  name: "SettingList",
  setup() {
    const store = useGlobalState();

    const getIcon = computed(() => {
      let { bgOpacity } = store.value.setting;
      if (bgOpacity < 25) return Moon;
      if (bgOpacity >= 25 && bgOpacity < 50) return MoonOutline;
      if (bgOpacity >= 50 && bgOpacity < 75) return SunnyOutline;
      return Sunny;
    });

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
            v-slots={{
              thumb: () => (
                <NIconWrapper size={18} border-radius={12}>
                  <NIcon size={14} component={getIcon.value} />
                </NIconWrapper>
              ),
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

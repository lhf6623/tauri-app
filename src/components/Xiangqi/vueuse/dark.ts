import { useDark } from "@vueuse/core";

export const isDark = useDark({
  storageKey: "xiangqi-theme-appearance",
});

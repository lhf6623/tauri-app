import { useEventBus } from "@vueuse/core";
const ResetMatchKey = Symbol();

/**
 * 重置象棋棋盘
 */
export const resetMatchBus = useEventBus(ResetMatchKey);

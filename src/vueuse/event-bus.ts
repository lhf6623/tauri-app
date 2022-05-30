import { useEventBus } from "@vueuse/core";

/**
 * 重置象棋棋盘
 */
const ResetMatchKey = Symbol();
export const resetMatchBus = useEventBus(ResetMatchKey);

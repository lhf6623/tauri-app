import { useEventBus } from "@vueuse/core";

/**
 * 重置象棋棋盘
 */
const ResetMatchKey = Symbol();
export const resetMatchBus = useEventBus(ResetMatchKey);

/**
 * 点击棋谱历史记录
 */
const HistoryKey = Symbol();
export const historyBus = useEventBus<number>(HistoryKey);

import { useEventBus } from "@vueuse/core";

/**
 * 重置象棋棋盘
 */
const RESET = Symbol();
export const ResetBus = useEventBus(RESET);

/**
 * 触发时光回溯
 */
const BACK = Symbol();
export const BackBus = useEventBus<number>(BACK);

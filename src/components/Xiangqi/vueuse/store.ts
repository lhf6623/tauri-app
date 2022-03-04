import { createGlobalState, useStorage } from "@vueuse/core";
const XIANGQI_KEY = "xiangqi_store_key";

export const useGlobalState = createGlobalState(() =>
  useStorage<StoreType>(XIANGQI_KEY, {
    tips: false,
    record: [],
  })
);

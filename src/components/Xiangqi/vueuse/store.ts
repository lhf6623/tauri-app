import { createGlobalState, useStorage } from "@vueuse/core";
import { RED } from "../config-data";
const XIANGQI_KEY = "xiangqi_store_key";

export const useGlobalState = createGlobalState(() =>
  useStorage<StoreType>(XIANGQI_KEY, {
    tips: false,
    record: [],
    nextAction: RED,
    identity: RED,
    transformStyle: "rotate(0deg)",
  })
);

import { createGlobalState, useStorage } from "@vueuse/core";
import { RED } from "../utils/data";
const XIANGQI_KEY = "xiangqi_store_key";

export const useGlobalState = createGlobalState(() =>
  useStorage<StoreType>(XIANGQI_KEY, {
    tips: true,
    record: [],
    recordActive: 0,
    nextAction: RED,
    identity: RED,
    transformStyle: `rotate(0deg)  translateZ(0)`,
  })
);

export const initChessGame = () => {
  const store = useGlobalState();
  store.value = {
    ...store.value,
    record: [],
    recordActive: 0,
    nextAction: RED,
  };
};

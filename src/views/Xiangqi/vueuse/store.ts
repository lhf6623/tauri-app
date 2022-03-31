import { createGlobalState, useStorage } from "@vueuse/core";
import { RED } from "../utils/data";
const XIANGQI_KEY = "xiangqi_store_key";

export const useGlobalState = createGlobalState(() =>
  useStorage<StoreType>(XIANGQI_KEY, {
    tips: false,
    record: [],
    recordType: true,
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
    record: ["炮二进七", "象3进5", "马二进三", "卒3进1"],
    recordType: false,
    recordActive: 0,
    nextAction: RED,
  };
};

import { createGlobalState, useStorage } from "@vueuse/core";
import { RED, BLACK } from "../utils/data";
import pkg from "../../package.json";

const { version } = pkg;
const XIANGQI_KEY = `xiangqi_store_${version}`;

export const useGlobalState = createGlobalState(() =>
  useStorage<StoreType>(
    XIANGQI_KEY,
    {
      record: [],
      nextAction: RED,
      identity: RED,
      transformStyle: `rotate(0deg)  translateZ(0)`,
      setting: {
        tips: true,
        bgOpacity: 10,
      },
    },
    window.sessionStorage
  )
);

/**
 * 初始化棋盘和记录
 * @param data
 */
export const initChessGame = (data: string[]) => {
  const store = useGlobalState();
  store.value = {
    ...store.value,
    record: data,
    nextAction: RED,
  };
};

/**
 * 旋转棋盘
 */
export const handleTrans = () => {
  const store = useGlobalState();
  let isRed = store.value.identity === RED;
  store.value.identity = isRed ? BLACK : RED;
  store.value.transformStyle = `rotate(${isRed ? 180 : 0}deg)  translateZ(0)`;
};

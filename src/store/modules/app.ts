import { defineStore } from "pinia";
import { store } from "@/store";
import { RED, BLACK } from "@/utils/data";
import { cloneDeep } from "@/utils/is";

import pkg from "../../../package.json";

const { version } = pkg;
const XIANGQI_KEY = `xiangqi_store_${version}`;

export const useAppStore = defineStore("app", {
  state: (): AppStoreType => ({
    isRecord: null,
    record: [],
    nextAction: RED,
    identity: RED,
    transformStyle: `rotate(0deg)  translateZ(0)`,
    setting: {
      tips: true,
      bgOpacity: 10,
    },
  }),
  getters: {
    getRecordLen: (state) => {
      return state.record.length;
    },
  },
  actions: {
    /* 初始化棋盘和记录 */
    initChessGame(data: []) {
      this.record = data;
      this.nextAction = RED;
    },
    /* 旋转棋盘 */
    changeTrans() {
      let isRed = this.identity === RED;
      this.identity = isRed ? BLACK : RED;
      this.transformStyle = `rotate(${isRed ? 180 : 0}deg)  translateZ(0)`;
    },
    /* 下棋方 */
    setNextAction() {
      const { nextAction } = this;
      this.nextAction = nextAction === RED ? BLACK : RED;
    },
    /* 记录 */
    setRecord(name: string, mapData: PieceType[]) {
      this.record.push({ name, mapData: cloneDeep(mapData) });
    },
    openRecord(isRecord: number | null) {
      this.isRecord = isRecord;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: XIANGQI_KEY,
        storage: localStorage,
      },
    ],
  },
});

export function useAppStoreWithOut() {
  return useAppStore(store);
}

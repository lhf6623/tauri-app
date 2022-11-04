import { defineStore } from "pinia";
import { store } from "@/store";

import { NULL, RED, BLACK, piece_list } from "@/utils/data";

import { makingChess, initMap } from "@/utils";
import { run_rule } from "@/utils/run-rule";
import { cloneDeep, isEmpty } from "lodash-es";

import pkg from "../../../package.json";

const { version, name } = pkg;
const XIANGQI_KEY = `${name}_${version}`;

export const useAppStore = defineStore("app", {
  state: (): AppStoreType => ({
    list: initMap(),
    active: [],
    is_run: true,
    record_index: 0,
    record: [],
    next: RED,
    identity: RED,
    setting: {
      tips: true,
      bgOpacity: 100,
      transformStyle: `rotate(0deg)  translateZ(0)`,
    },
  }),
  actions: {
    /* 重新开始 */
    refreshGame() {
      this.list = initMap();
      this.active = [];
      this.is_run = true;
      this.next = RED;
      this.record = [];
      this.identity = RED;
    },
    /** 读取记录 */
    readRecord(index: number) {
      this.active = [];
      this.record_index = index;

      this.list = initMap(this.record[index].list);
      this.is_run = index + 1 === this.record.length;
    },
    /** 在刷新的时候回到第一步 */
    goEnd() {
      const LEN = this.record.length - 1;
      this.list = initMap(this.record?.[LEN]?.["list"] ?? piece_list);
      this.is_run = true;
      this.active = [];
      this.record_index = LEN;
    },
    /** 棋盘格子的活动状态 */
    setActive(piece: PieceType | null | undefined) {
      if (piece) {
        let { code, index } = piece;
        let run_lattice = run_rule[code]?.(this.list, piece) || [];
        this.active = [index, ...run_lattice];
      } else {
        this.active = [];
      }
    },
    /** 点击格子，选中 或者 移动棋子 */
    clickLattice(index: number, item: PieceType | null) {
      if (!this.is_run) return;
      let [pieceIndex] = this.active;
      // 走棋
      if (this.active.length) {
        let _piece = this.list[pieceIndex] as PieceType;

        // 空地, 不在棋子可行走范围内
        if (item === NULL && !this.active.includes(index)) return;

        if (item) {
          // 同一阵营的更新选中棋子
          if (_piece.type === item.type) {
            this.setActive(item);
            return;
          }
          // 不在棋子可行走范围内
          if (!this.active.includes(index)) return;
        }
        const _mapList = cloneDeep(this.list);

        this.list[index] = { ..._piece, index };
        this.list[pieceIndex] = NULL;
        this.setActive(null);

        this.next = this.next === RED ? BLACK : RED;

        this.record.push({
          name: makingChess(_mapList, pieceIndex, index),
          list: this.list.flatMap((item) => (item === NULL ? [] : [item])),
        });
        this.record_index = this.record.length - 1;
        return;
      }

      // 选中棋子
      if (item !== NULL && isEmpty(this.active) && this.next === item.type) {
        this.setActive(item);
      }
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

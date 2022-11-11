import { WebviewWindow } from "@tauri-apps/api/window";
export type PieceColorType = "isRed" | "isBlack";
export type NullType = null;
export type PieceCodeType =
  | "che"
  | "ma"
  | "xiang"
  | "shi"
  | "jiang"
  | "pao"
  | "bing";
export type PieceTextType =
  | "车"
  | "马"
  | "相"
  | "象"
  | "仕"
  | "士"
  | "帅"
  | "将"
  | "炮"
  | "兵"
  | "卒";

export type Text3Type = "进" | "退" | "平";
export type Text1Type = "前" | "后";

export type PieceType = {
  index: number;
  text: PieceTextType;
  type: PieceColorType;
  code: PieceCodeType;
};

export type RunRule = {
  [key in PieceCodeType]?: (
    map: Array<PieceType | null>,
    piece: PieceType
  ) => number[];
};

export type SettingType = {
  // 可移动格子提示
  tips: boolean;
  // 透明度
  bgOpacity: number;
  // 根据所执棋的颜色翻转棋盘 translateZ(0) 防抖动
  transformStyle:
    | "rotate(0deg)  translateZ(0)"
    | "rotate(180deg)  translateZ(0)";
};

export type AppStoreType = {
  // 设置项
  setting: SettingType;
  // 棋谱
  record: Array<{
    name: string;
    list: PieceType[];
  }>;
  list: Array<PieceType | NullType>;
  active: number[];
  // 是否在看历史记录
  is_run: boolean;
  // 点击历史记录
  record_index: number;
  // 下一个移动棋子的一方
  next: PieceColorType;
  // 当前人所执棋的颜色
  identity: PieceColorType;
};

export type MirrorStoreType = {
  mirrorIsOpen: boolean;
  mirrorWindow: WebviewWindow | null;
};

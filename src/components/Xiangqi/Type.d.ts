type Type = "isRed" | "isBlack";
type PieceCodeType = "che" | "ma" | "xiang" | "shi" | "jiang" | "pao" | "bing";
type PieceTextType =
  | "车"
  | "車"
  | "马"
  | "馬"
  | "相"
  | "象"
  | "仕"
  | "士"
  | "帅"
  | "将"
  | "炮"
  | "兵"
  | "卒";

type Text3Type = "进" | "退" | "平";

type PieceType = {
  index: number;
  text: PieceTextType;
  type: Type;
  code: PieceCodeType;
};

type RunRule = {
  [key in PieceCodeType]?: (
    map: Array<PieceType | null>,
    piece: PieceType
  ) => number[];
};

type StoreType = {
  // 可移动格子提示
  tips: boolean;
  // 棋谱
  record: Array<string>;
  // 下一个移动棋子的一方
  nextAction: Type;
  // 当前人所执棋的颜色
  identity: Type;
  // 根据所执棋的颜色翻转棋盘 translateZ(0) 防抖动
  transformStyle:
    | "rotate(0deg)  translateZ(0)"
    | "rotate(180deg)  translateZ(0)";
};

type StoreKeyType = keyof StoreType;

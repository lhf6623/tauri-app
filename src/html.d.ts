import type { AttributifyAttributes } from 'unocss/preset-attributify';

declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes {}
}

export {};

declare global {
  type PieceColorType = 'isRed' | 'isBlack';
  type NullType = null;
  type PieceCodeType =
    | 'che'
    | 'ma'
    | 'xiang'
    | 'shi'
    | 'jiang'
    | 'pao'
    | 'bing';
  type PieceTextType =
    | '车'
    | '马'
    | '相'
    | '象'
    | '仕'
    | '士'
    | '帅'
    | '将'
    | '炮'
    | '兵'
    | '卒';

  type Text3Type = '进' | '退' | '平';
  type Text1Type = '前' | '后';

  type PieceType = {
    index: number;
    text: PieceTextType;
    type: PieceColorType;
    code: PieceCodeType;
  };

  type RunRule = {
    [key in PieceCodeType]?: (
      map: Array<PieceType | null>,
      piece: PieceType
    ) => number[];
  };

  type SettingType = {
    // 可移动格子提示
    tips: boolean;
    // 透明度
    bgOpacity: number;
    // 根据所执棋的颜色翻转棋盘 translateZ(0) 防抖动
    transformStyle:
      | 'rotate(0deg)  translateZ(0)'
      | 'rotate(180deg)  translateZ(0)';
  };

  type AppStoreType = {
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
}

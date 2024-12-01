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
  type RecordItem = {
    name: string;
    list: PieceType[];
  };
  type AppStoreType = {
    /** 棋谱记录 */
    record: Array<RecordItem>;
    /** 推演列表 */
    deduction_list: Array<RecordItem>;
    /** 当前棋盘落子情况 */
    list: Array<PieceType | NullType>;
    /** 选中的棋子 */
    active: number[];
    /** 是否在看历史记录 */
    is_run: boolean;
    /** 点击历史记录 */
    record_index: number;
    /** 下一个移动棋子的一方 */
    next: PieceColorType;
  };
}

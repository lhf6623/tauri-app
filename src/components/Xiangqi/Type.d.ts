type Type = "isRed" | "isBlack";
type PieceCodeType =
  | "che"
  | "ma"
  | "xiang"
  | "shi"
  | "jiang"
  | "pao"
  | "zu"
  | "bing";
type PieceType = {
  index: number;
  text: string;
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
  tips?: boolean;
  isDark?: boolean;
};

type StoreKeyType = keyof StoreType;

type ThemeOverridesType = {
  common: {
    xWidth: string;
    xHeight: string;
    xRedTextColor: string;
    xRedBgColor: string;
    xBlackBgColor: string;
    xBlackTextColor: string;
    xBgColor: string;
    xPlateColor: string;
    xLineColor: string;
    xTitleBgColor: string;
    xMapShadowColor: string;
    xActiveColor: string;
    xActiveEmptyColor: string;
    xRecordBgColor: string;
  };
};

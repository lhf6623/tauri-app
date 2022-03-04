import { indexToXY } from "./run-rule";
import { RED, COL, ROW, NULL, numbers, numbers_cn } from "./index";
import { isMatch } from "lodash-es";

type Text3Type = "进" | "退" | "平";
/* 下棋制作棋谱 */
/**
 * 直走的直接加减，马，相，士之类的需要按照x轴数字来显示
 * @param beforeIndex
 * @param afterIndex
 * @param param2
 * @returns
 */
function getText4(
  beforeIndex: number,
  afterIndex: number,
  { type }: PieceType
): string | number {
  let isRed = type === RED;
  let { y: beforeY, x: beforeX } = indexToXY(beforeIndex);
  let { y: afterY, x: afterX } = indexToXY(afterIndex);

  // y轴相等，平移
  if (beforeY === afterY || (beforeX !== afterX && beforeY !== afterY)) {
    return isRed ? numbers_cn[afterX] : numbers[afterX];
  } else {
    // x轴相等，上下移动
    //if (beforeX === afterX) {
    let _y = Math.abs(afterY - beforeY);
    return isRed ? numbers_cn[numbers_cn.length - _y] : numbers[_y - 1];
  }
}

/**
 * 棋谱第三个字
 * @param beforeIndex 移动前棋子下标
 * @param afterIndex 移动后棋子下标
 * @param param2 当前棋子
 * @returns Text3Type
 */
function getText3(
  beforeIndex: number,
  afterIndex: number,
  { type }: PieceType
): Text3Type {
  let isRed = type === RED;
  let { y: beforeY } = indexToXY(beforeIndex);
  let { y: afterY } = indexToXY(afterIndex);

  // 直线
  if (beforeY === afterY) return "平";

  // 红棋，移动前棋子 小于当前棋子 进，反之 退
  // 黑棋，移动前棋子 小于当前棋子 进，反之 退
  if (isRed) {
    return beforeIndex < afterIndex ? "退" : "进";
  } else {
    return beforeIndex < afterIndex ? "进" : "退";
  }
}

/**
 * 棋谱第二个字
 * @param index
 * @param isRed[boolean]
 * @returns
 */
function getText2(index: number, isRed: boolean): string | number {
  let { x } = indexToXY(index);

  return isRed ? numbers_cn[x] : numbers[x];
}

/**
 * 竖轴有没有相同的棋子
 * @param mapArr 棋盘数组
 * @param piece 移动之前的棋子下标
 * @returns
 */
function getVerticalPiece(
  mapArr: Array<PieceType | null>,
  piece: PieceType
): string {
  let { index, type, text } = piece;
  let { x, y } = indexToXY(index);
  let isRed = type === RED;
  // 红棋，查询到的棋子 下标y 小于当前棋子 后，反之 前
  // 黑棋，查询到的棋子 下标y 大于当前棋子 后，反之 后
  // 没有 就是当前棋子的 text
  for (let i = 0; i < ROW; i++) {
    let _index = i * COL + x;
    let targetPiece = mapArr[_index];
    if (targetPiece !== NULL && _index !== index) {
      let { code, type, text } = targetPiece;
      if (isMatch(piece, { code, type, text })) {
        if ((isRed && i < y) || (!isRed && i > y)) {
          return `后${text}`;
        }
        if ((isRed && i > y) || (!isRed && i < y)) {
          return `前${text}`;
        }
      }
    }
  }
  return text.length === 1 ? `${text}${getText2(index, isRed)}` : text;
}

/**
 * 象棋棋谱制作
 * @param mapArr 棋盘数组
 * @param beforeIndex 移动之前的棋子下标
 * @param afterIndex 移动过后的棋子下标
 * @returns {String} 棋谱
 */
export const makingChess = (
  mapArr: Array<PieceType | null>,
  beforeIndex: number,
  afterIndex: number
): string => {
  const beforePice = mapArr[beforeIndex] as PieceType;
  let text1_2 = getVerticalPiece(mapArr, beforePice);
  let text3 = getText3(beforeIndex, afterIndex, beforePice);
  let text4 = getText4(beforeIndex, afterIndex, beforePice);
  return `${text1_2}${text3}${text4}`;
};

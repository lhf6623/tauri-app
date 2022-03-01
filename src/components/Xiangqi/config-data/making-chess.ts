import { indexToXY } from "./run-rule";
import { RED, BLACK, COL, ROW, NULL } from "./index";
import { isMatch, isEmpty } from "lodash-es";
/* 下棋制作棋谱 */

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
  return text;
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
  let text1 = getVerticalPiece(mapArr, beforePice);
  return `${text1}`;
};

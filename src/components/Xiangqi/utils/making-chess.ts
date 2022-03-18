/**
 * 下棋制作棋谱
 */
import { RED, COL, ROW, NULL, indexToXY } from "./data";
import { isMatch, cloneDeep } from "lodash-es";
import { numbers, numbers_cn } from "./data";

const _numbers_cn = cloneDeep(numbers_cn).reverse();

/**
 * 直走的直接加减，马，相，士之类的需要按照x轴数字来显示
 * @param beforeIndex
 * @param afterIndex
 * @param param2
 * @returns
 */
const getText4 = (
  beforeIndex: number,
  afterIndex: number,
  { type }: PieceType
): string | number => {
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
};

/**
 * 棋谱第三个字
 * @param beforeIndex 移动前棋子下标
 * @param afterIndex 移动后棋子下标
 * @param param2 当前棋子
 * @returns Text3Type
 */
const getText3 = (
  beforeIndex: number,
  afterIndex: number,
  { type }: PieceType
): Text3Type => {
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
};

/**
 * 棋谱第二个字
 * @param index
 * @param isRed[boolean]
 * @returns
 */
const getText2 = (index: number, isRed: boolean): string | number => {
  let { x } = indexToXY(index);

  return isRed ? numbers_cn[x] : numbers[x];
};

/**
 * 获取Y轴相同的棋子下标
 * @param mapArr 棋盘数组
 * @param piece 移动之前的棋子
 * @returns
 */
const getYIndex = (
  mapArr: Array<PieceType | null>,
  piece: PieceType
): number[] => {
  let res: number[] = [];
  let { index } = piece;
  let { x } = indexToXY(index);

  for (let i = 0; i < ROW; i++) {
    let _index = i * COL + x;
    let targetPiece = mapArr[_index];
    if (targetPiece !== NULL) {
      let { code, type, text } = targetPiece;
      if (isMatch(piece, { code, type, text })) {
        res.push(targetPiece.index);
      }
    }
  }
  return res;
};

/**
 * 判断是否有两列兵,每列两个或以上
 * @param mapArr
 * @param piece
 * @returns
 */
const isTwoColBing = (
  mapArr: Array<PieceType | null>,
  piece: PieceType
): boolean => {
  let obj: { [k: number]: number } = {};
  let { code, type, text } = piece;
  mapArr.forEach((item) => {
    if (item && isMatch(item, { code, type, text })) {
      let { index } = item;
      let { x } = indexToXY(index);
      if (!obj[x]) {
        obj[x] = 1;
      } else {
        obj[x] += 1;
      }
    }
  });
  return Object.values(obj).filter((n) => n >= 2).length >= 2;
};
/**
 * 获取第一个文字
 * @param mapArr
 * @param piece
 * @returns
 */
const getText1 = (
  mapArr: Array<PieceType | null>,
  piece: PieceType
): string => {
  let { index, type, text, code } = piece;
  let isRed = type === RED;

  const yArr = getYIndex(mapArr, piece);
  if (code === "bing" && yArr.length >= 2 && isTwoColBing(mapArr, piece)) {
    // 第一个字是棋子对应在第几个位置
    let _y = yArr.indexOf(index);
    const textBing = isRed ? _numbers_cn[_y] : yArr.length - _y;

    // 第二个字是棋子文字
    // 第三个字是棋盘对应的列数
    return `${textBing}${text}${getText2(index, isRed)}`;
  }
  // 红棋，查询到的棋子 下标y 小于当前棋子 后，反之 前
  // 黑棋，查询到的棋子 下标y 大于当前棋子 后，反之 后
  // 没有 就是当前棋子的 text
  for (let i = 0; i < yArr.length; i++) {
    let _index = yArr[i];
    if ((isRed && _index < index) || (!isRed && _index > index)) {
      return `后${text}`;
    }
    if ((isRed && _index > index) || (!isRed && _index < index)) {
      return `前${text}`;
    }
  }
  return text.length === 1 ? `${text}${getText2(index, isRed)}` : text;
};

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
  // 如果是兵 特殊情可能有三个字
  const text1_2_3 = getText1(mapArr, beforePice);
  const text3 = getText3(beforeIndex, afterIndex, beforePice);
  const text4 = getText4(beforeIndex, afterIndex, beforePice);
  return `${text1_2_3}${text3}${text4}`;
};

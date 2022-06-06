import { RED, COL, indexToXY } from "./data";
import { isMatch, cloneDeep } from "./is";
import { numbers, numbers_cn, text1, text3 } from "./data";

const [QIAN, HOU] = text1;
const [JIN, TUI, PING] = text3;

const _numbers_cn = cloneDeep(numbers_cn).reverse();

/**
 * 直走的直接加减，马，相，士之类的需要按照x轴数字来显示
 * @param beforeIndex
 * @param afterIndex
 * @param piece
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
 * @param piece 当前棋子
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
  if (beforeY === afterY) return PING;

  // 红棋，移动前棋子 小于当前棋子 进，反之 退
  // 黑棋，移动前棋子 小于当前棋子 进，反之 退
  if (isRed) {
    return beforeIndex < afterIndex ? TUI : JIN;
  } else {
    return beforeIndex < afterIndex ? JIN : TUI;
  }
};

/**
 * 棋谱第二个字
 * @param index
 * @param isRed
 */
const getText2 = (index: number, isRed: boolean): string | number => {
  let { x } = indexToXY(index);

  return isRed ? numbers_cn[x] : numbers[x];
};

/**
 * 获取Y轴相同的棋子下标
 * @param indexArr 相同棋子下标数组
 * @param piece 移动之前的棋子
 */
const getYIndex = (indexArr: Array<number>, piece: PieceType): number[] => {
  let { x } = indexToXY(piece.index);

  return indexArr.filter((_index) => _index % COL == x);
};

/**
 * 判断是否有两列兵,每列两个或以上
 * @param indexArr 相同棋子下标数组
 */
const isTwoColBing = (indexArr: Array<number>): boolean => {
  let obj: { [k: number]: number } = {};
  indexArr.forEach((index) => {
    let { x } = indexToXY(index);

    obj[x] = obj[x] ? obj[x] + 1 : 1;
  });
  return Object.values(obj).filter((n) => n >= 2).length >= 2;
};
/**
 * 获取第一个文字
 * @param mapArr
 * @param piece
 */
const getText1 = (mapArr: Array<number>, piece: PieceType): string => {
  let { index, type, text, code } = piece;
  let isRed = type === RED;

  const yArr = getYIndex(mapArr, piece);

  if ((code === "bing" && yArr.length >= 3) || isTwoColBing(mapArr)) {
    // 第一个字是棋子对应在Y轴第几个位置
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
      return `${HOU}${text}`;
    }
    if ((isRed && _index > index) || (!isRed && _index < index)) {
      return `${QIAN}${text}`;
    }
  }
  return `${text}${getText2(index, isRed)}`;
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
  const text1_2_3 = getText1(
    // 找出相同棋子的下标
    mapArr.flatMap((_beforePice) => {
      let { code, type, text, index } = _beforePice || { index: 0 };
      if (isMatch(beforePice, { code, type, text })) return [index];
      return [];
    }),
    beforePice
  );
  const text3 = getText3(beforeIndex, afterIndex, beforePice);
  const text4 = getText4(beforeIndex, afterIndex, beforePice);
  return `${text1_2_3}${text3}${text4}`;
};

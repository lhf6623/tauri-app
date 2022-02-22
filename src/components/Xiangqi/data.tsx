import { inRange, ceil } from "lodash-es";
export const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export const numbers_cn: string[] = [
  "九",
  "八",
  "七",
  "六",
  "五",
  "四",
  "三",
  "二",
  "一",
];
export const piece_init_list: PieceType[] = [
  {
    index: 0,
    text: "車",
    code: "che",
    type: "isBlack",
  },
  {
    index: 1,
    text: "馬",
    code: "ma",
    type: "isBlack",
  },
  {
    index: 2,
    text: "象",
    code: "xiang",
    type: "isBlack",
  },
  {
    index: 3,
    text: "士",
    code: "shi",
    type: "isBlack",
  },
  {
    index: 4,
    text: "将",
    code: "jiang",
    type: "isBlack",
  },
  {
    index: 5,
    text: "士",
    code: "shi",
    type: "isBlack",
  },
  {
    index: 6,
    text: "象",
    code: "xiang",
    type: "isBlack",
  },
  {
    index: 7,
    text: "馬",
    code: "ma",
    type: "isBlack",
  },
  {
    index: 8,
    text: "車",
    code: "che",
    type: "isBlack",
  },
  {
    index: 19,
    text: "炮",
    code: "pao",
    type: "isBlack",
  },
  {
    index: 25,
    text: "炮",
    code: "pao",
    type: "isBlack",
  },
  {
    index: 27,
    text: "卒",
    code: "zu",
    type: "isBlack",
  },
  {
    index: 29,
    text: "卒",
    code: "zu",
    type: "isBlack",
  },
  {
    index: 31,
    text: "卒",
    code: "zu",
    type: "isBlack",
  },
  {
    index: 33,
    text: "卒",
    code: "zu",
    type: "isBlack",
  },
  {
    index: 35,
    text: "卒",
    code: "zu",
    type: "isBlack",
  },
  {
    index: 54,
    text: "兵",
    code: "bing",
    type: "isRed",
  },
  {
    index: 56,
    text: "兵",
    code: "bing",
    type: "isRed",
  },
  {
    index: 58,
    text: "兵",
    code: "bing",
    type: "isRed",
  },
  {
    index: 60,
    text: "兵",
    code: "bing",
    type: "isRed",
  },
  {
    index: 62,
    text: "兵",
    code: "bing",
    type: "isRed",
  },
  {
    index: 64,
    text: "炮",
    code: "pao",
    type: "isRed",
  },
  {
    index: 70,
    text: "炮",
    code: "pao",
    type: "isRed",
  },
  {
    index: 81,
    text: "车",
    code: "che",
    type: "isRed",
  },
  {
    index: 82,
    text: "马",
    code: "ma",
    type: "isRed",
  },
  {
    index: 83,
    text: "相",
    code: "xiang",
    type: "isRed",
  },
  {
    index: 84,
    text: "仕",
    code: "shi",
    type: "isRed",
  },
  {
    index: 85,
    text: "帅",
    code: "jiang",
    type: "isRed",
  },
  {
    index: 86,
    text: "仕",
    code: "shi",
    type: "isRed",
  },
  {
    index: 87,
    text: "相",
    code: "xiang",
    type: "isRed",
  },
  {
    index: 88,
    text: "马",
    code: "ma",
    type: "isRed",
  },
  {
    index: 89,
    text: "车",
    code: "che",
    type: "isRed",
  },
];

export const COL: number = 9;
export const ROW: number = 10;
export const NULL_VALUE: null = null;
function indexToXY(index: number): { x: number; y: number } {
  return {
    x: index % COL,
    y: (index / COL) | 0,
  };
}
/* 直线 上，左，下，右 [x, y] che pao */
let straight_run_rule: number[][] = [
  [0, -1],
  [-1, 0],
  [0, 1],
  [1, 0],
];
/* MA移动规则 八个位子 上[上左][上右]，左[左上][左下]，下[下左][下右]，右[右上][右下]  [x, y] 对应 straight_run_rule*/
const run_rule_ma: number[][] = [
  [-1, -2],
  [1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, -1],
  [2, 1],
];
// 将帅 可移动位置
const JIANG = [
  3, 4, 5, 12, 13, 14, 21, 22, 23, 66, 67, 68, 75, 76, 77, 84, 85, 86,
];
/**
 * 在地图上
 */
function isInMap(x: number, y: number): boolean {
  return inRange(x, 0, COL) && inRange(y, 0, ROW);
}
/**
 * 判断所在位置是否可以走步
 */
function isPass(map: (PieceType | null)[], i: number, type: Type): boolean {
  return map[i] === NULL_VALUE || map[i]?.type !== type;
}
export const run_rule: RunRule = {
  che: (map, { index: pieceIndex, type: pieceType }) => {
    let result: number[] = [];
    const { x, y } = indexToXY(pieceIndex);
    straight_run_rule.forEach(([col, row]) => {
      for (let i = 1; ; i++) {
        const _x = x + i * col;
        const _y = y + i * row;
        const _index = _y * COL + _x;
        if (!isInMap(_x, _y) || map[_index]?.type === pieceType) break;
        result.push(_index);
        if (map[_index] !== NULL_VALUE) break;
      }
    });
    return result;
  },
  pao(map, { type, index }) {
    let result: number[] = [];
    const { x, y } = indexToXY(index);
    straight_run_rule.forEach(([col, row]) => {
      let obstacle = 0; // 障碍物，长度等于两个停止循环
      for (let i = 1; ; i++) {
        const _x = x + i * col;
        const _y = y + i * row;
        const _index = _y * COL + _x;
        if (!isInMap(_x, _y)) break;
        if (obstacle === 0 && map[_index] === NULL_VALUE) {
          result.push(_index);
        } else if (map[_index] !== NULL_VALUE) {
          obstacle += 1;
          if (obstacle === 2 && map[_index]?.type !== type) {
            result.push(_index);
            break;
          }
        }
      }
    });
    return result;
  },
  jiang(map, { type, index }) {
    let result: number[] = [];
    const { x, y } = indexToXY(index);
    straight_run_rule.forEach(([col, row]) => {
      const _x = x + col;
      const _y = y + row;
      const _index = _y * COL + _x;
      if (
        isInMap(_x, _y) &&
        JIANG.includes(_index) &&
        isPass(map, _index, type)
      ) {
        result.push(_index);
      }
    });
    return result;
  },
  ma(map, { type, index }) {
    let result: number[] = [];
    const { x, y } = indexToXY(index);
    run_rule_ma.forEach(([col, row], i) => {
      const _x = x + col;
      const _y = y + row;
      const _index = _y * COL + _x;
      // 马脚
      const [bX, bY] = straight_run_rule[ceil((i + 1) / 2) - 1];
      const bIndex = (y + bY) * COL + (x + bX);
      if (
        isInMap(_x, _y) &&
        map[bIndex] === NULL_VALUE &&
        isPass(map, _index, type)
      ) {
        result.push(_index);
      }
    });
    return result;
  },
};

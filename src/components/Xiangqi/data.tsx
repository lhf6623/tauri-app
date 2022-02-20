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

const COL = 9;
const ROW = 10;
function indexToXY(index: number) {
  return {
    x: index % COL,
    y: (index / COL) | 0,
  };
}
export const run_rule: RunRule = {
  /**
   * 车走直线 自己一方的不能走，对方的只能吃一颗遇到的棋子
   */
  che: (map, piece) => {
    let { index } = piece;
    console.log(`🚀 ~ index`, index);
    console.log(indexToXY(index));
    /*  */
    return [];
  },
};

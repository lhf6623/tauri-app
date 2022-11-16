import { inRange, random } from "lodash-es";
/** 一列 x 轴 */
export const COL = 120;
/** 一行 y 轴 */
export const ROW = 120;
/** 格子大小 */
export const SIZE = "4px";
/** 多少个随机数 */
export const RANDOM = 5240;

export function indexToXY(index: number): { x: number; y: number } {
  return {
    x: index % COL,
    y: (index / COL) | 0,
  };
}

/**
 * 获取多个随机数
 * @param max 随机数最大范围
 * @param total 随机数的总数
 * @param randomList 返回数组
 * @returns Array<number>
 */
export function getRandom(
  max: number,
  total: number,
  randomList: Array<number> = []
): number[] {
  if (total > max) {
    console.error(`${total}大于${max}`);
    return [];
  }
  const _random = random(0, max);
  if (!randomList.includes(_random)) {
    randomList.push(_random);
  }

  return randomList.length < total
    ? getRandom(max, total, randomList)
    : randomList;
}
/**
 * [x, y]

    [-1, -1] [0, -1] [1, -1]
    [-1, 0] [0, 0] [1, 0]
    [-1, 1] [0, 1] [1, 1]
 */
const aroundLattice = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];
function isInMap(col: number, row: number): boolean {
  return inRange(col, 0, COL) && inRange(row, 0, ROW);
}
/**
 * 获取周边格子状态
 * @param index 目标格子
 * @param targetState 目标格子状态
 * @param lifeList 整体数组
 * @returns
 */
export function getAroundState(
  index: number,
  targetState: boolean,
  lifeList: Array<boolean>
) {
  const res = [];
  const { x, y } = indexToXY(index);

  for (let i = 0; i < aroundLattice.length; i++) {
    const [col, row] = aroundLattice[i];
    const _x = x + col;
    const _y = y + row;
    const _index = _y * COL + _x;
    if (
      !isInMap(_x, _y) ||
      !inRange(_index, 0, lifeList.length + 1) ||
      !lifeList[_index]
    ) {
      continue;
    }
    res.push(_index);
  }
  const LEN = res.length;
  /* 
  (1)当前细胞为死亡状态时，当周围有3个存活细胞时，则迭代后该细胞变成存活状态(模拟繁殖)；若原先为生，则保持不变。
  */
  if (LEN === 3) return true;
  /* 
  (2)当前细胞为存活状态时，当周围的邻居细胞低于两个(不包含两个)存活时，该细胞变成死亡状态(模拟生命数量稀少)。
  */
  /* if (targetState && LEN < 2) {
    return false
  } */
  /* 
  (3)当前细胞为存活状态时，当周围有两个或3个存活细胞时，该细胞保持原样。
  */
  if (targetState && [2, 3].includes(LEN)) return true;
  /* 
  (4)当前细胞为存活状态时，当周围有3个以上的存活细胞时，该细胞变成死亡状态(模拟生命数量过多)。
  */
  /* if (targetState && LEN > 3) {
    return false
  } */
  return false;
}

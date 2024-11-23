import {
  lineRule,
  maRule,
  jiangSeat,
  xiangRule,
  xiangJiaoRule,
  shiRule,
  shiSeat,
} from './run-rule-data';
import { COL, ROW, NULL, BLACK, RED, indexToXY } from './data';
import { inRange, ceil } from 'lodash-es';

/**
 * 在地图上
 */
function isInMap(col: number, row: number): boolean {
  return inRange(col, 0, COL) && inRange(row, 0, ROW);
}
/**
 * 判断所在位置是否可以走步
 */
function isPass(
  map: (PieceType | null)[],
  i: number,
  pieceType: PieceColorType
): boolean {
  return map[i] === NULL || map[i]?.type !== pieceType;
}
export const run_rule: RunRule = {
  che: (map, { index: pieceIndex, type: pieceType }) => {
    const result: number[] = [];
    const { x, y } = indexToXY(pieceIndex);
    lineRule.forEach(([col, row]) => {
      for (let i = 1; ; i++) {
        const _x = x + i * col;
        const _y = y + i * row;
        const _index = _y * COL + _x;
        if (!isInMap(_x, _y) || map[_index]?.type === pieceType) break;
        result.push(_index);
        if (map[_index] !== NULL) break;
      }
    });
    return result;
  },
  pao(map, { type, index }) {
    const result: number[] = [];
    const { x, y } = indexToXY(index);
    lineRule.forEach(([col, row]) => {
      let obstacle = 0; // 障碍物，长度等于两个停止循环
      for (let i = 1; ; i++) {
        const _x = x + i * col;
        const _y = y + i * row;
        const _index = _y * COL + _x;
        if (!isInMap(_x, _y)) break;
        if (obstacle === 0 && map[_index] === NULL) {
          result.push(_index);
        } else if (map[_index] !== NULL) {
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
    const result: number[] = [];
    const { x, y } = indexToXY(index);
    lineRule.forEach(([col, row]) => {
      const _x = x + col;
      const _y = y + row;
      const _index = _y * COL + _x;
      if (
        isInMap(_x, _y) &&
        jiangSeat.includes(_index) &&
        isPass(map, _index, type)
      ) {
        result.push(_index);
      }
    });
    return result;
  },
  ma(map, { type, index }) {
    const result: number[] = [];
    const { x, y } = indexToXY(index);
    maRule.forEach(([col, row], i) => {
      const _x = x + col;
      const _y = y + row;
      const _index = _y * COL + _x;
      // 马脚
      const [bX, bY] = lineRule[ceil((i + 1) / 2) - 1];
      const bIndex = (y + bY) * COL + (x + bX);
      if (
        isInMap(_x, _y) &&
        map[bIndex] === NULL &&
        isPass(map, _index, type)
      ) {
        result.push(_index);
      }
    });
    return result;
  },
  xiang(map, { type, index }) {
    const result: number[] = [];
    const { x, y } = indexToXY(index);
    // 不能过河
    const span = index < map.length / 2;
    xiangRule.forEach(([col, row], i) => {
      const _col = x + col;
      const _row = y + row;
      const _index = _row * COL + _col;
      // 象脚
      const [bX, bY] = xiangJiaoRule[i];
      const bIndex = (y + bY) * COL + (x + bX);
      const _span = _index < map.length / 2;
      if (
        isInMap(_col, _row) &&
        span === _span &&
        map[bIndex] === NULL &&
        isPass(map, _index, type)
      ) {
        result.push(_index);
      }
    });
    return result;
  },
  shi(map, { type, index }) {
    const result: number[] = [];
    const { x, y } = indexToXY(index);
    shiRule.forEach(([col, row]) => {
      const _col = x + col;
      const _row = y + row;
      const _index = _row * COL + _col;
      if (
        isInMap(_col, _row) &&
        shiSeat.includes(_index) &&
        isPass(map, _index, type)
      ) {
        result.push(_index);
      }
    });
    return result;
  },
  bing(map, { type, index }) {
    const result: number[] = [];
    const { x, y } = indexToXY(index);
    const MAP_LEN = map.length / 2;

    // 不能后退，过河之前不能左右移动
    for (const [col, row] of lineRule.values()) {
      const _col = x + col;
      const _row = y + row;
      const _index = _row * COL + _col;
      if (!isInMap(_col, _row) || !isPass(map, _index, type)) continue;
      // 小兵没过河之前不允许左右移动，不能后退，到底线时只能左右移动
      if (row === 0) {
        // 左右
        if (
          (type === BLACK && _index > MAP_LEN) ||
          (type === RED && _index < MAP_LEN)
        ) {
          result.push(_index);
        }
      } else {
        // 上下
        const CHESS = row > 0 ? RED : BLACK;
        if (type !== CHESS) {
          result.push(_index);
        }
      }
    }
    return result;
  },
};

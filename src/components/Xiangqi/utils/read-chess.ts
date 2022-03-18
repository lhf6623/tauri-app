/**
 * 读取棋谱
 */
import { COL, ROW, NULL, piece_list } from "./data";
export const initMap = () => {
  const mapList = Array(COL * ROW).fill(NULL);
  piece_list.forEach((item) => {
    let { index } = item;
    mapList[index] = { ...item };
  });
  return mapList;
};
export const readChess = (record: string[], index: number) => {
  console.log(record, index);
};

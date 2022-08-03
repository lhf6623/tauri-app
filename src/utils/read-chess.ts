import { initMap } from "./data";
import { cloneDeep } from "@/utils/is";

/**
 * @param record 棋谱
 * @param index 点击的第几步棋
 */
export const readChess = (
  record: Array<{
    name: string;
    mapData: PieceType[];
  }>,
  index: number
): Array<PieceType | null> => {
  let { mapData } = record[index];
  let mapList = initMap(false);
  cloneDeep(mapData).forEach((item: PieceType) => {
    let { index } = item;
    mapList[index] = { ...item };
  });
  return mapList;
};

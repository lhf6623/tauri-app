/**
 * 读取棋谱
 */
import { COL, ROW, NULL, piece_list } from "./data";
const pieceTexts = piece_list.map(({ text }) => text);

export const initMap = () => {
  const mapList: Array<PieceType | null> = Array(COL * ROW).fill(NULL);
  piece_list.forEach((item) => {
    let { index } = item;
    mapList[index] = { ...item };
  });
  return mapList;
};

/**
 * 获取运动前的棋子
 * 前两个字定位棋子，后两个字表示棋子怎么动的
 * @param mapList 初始化的棋盘数据
 * @param pace 棋子记录
 * @returns
 */
const getBeforeMotion = (
  mapList: Array<PieceType | null>,
  pace: string
): number => {
  let [text1, text2, text3, text4] = pace.split("");
  console.log(`🚀 ~ text1`, text1);
  pieceTexts.includes(text1 as PieceTextType);
  return 0;
};

/**
 * 读取棋谱
 * @param record 棋谱
 * @param index 点击的第几步棋
 */
export const readChess = (
  record: string[],
  index: number
): Array<PieceType | null> => {
  console.log(record, index);
  let mapList = initMap();
  getBeforeMotion(mapList, record[index]);
  return mapList;
};

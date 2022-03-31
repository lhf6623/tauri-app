/**
 * 读取棋谱
 */
import {
  COL,
  ROW,
  NULL,
  piece_list,
  text1,
  text3,
  numbers,
  numbers_cn,
  indexToXY,
} from "./data";
/** 棋子的文字 */
const pieceTexts = piece_list.map(({ text }) => text);

export const initMap = () => {
  const mapList: Array<PieceType | null> = Array(COL * ROW).fill(NULL);
  piece_list.forEach((item) => {
    let { index } = item;
    mapList[index] = { ...item };
  });
  return mapList;
};

// number 在 split 切割中会变成 string，所以没有 number  类型的
type RecordItemType = [
  PieceTextType | Text1Type,
  string | PieceTextType,
  Text3Type,
  string
];
/**
 * 获取运动前的棋子
 *
 * 前两个字定位棋子，后两个字表示棋子怎么动的
 * @param mapList 初始化的棋盘数据
 * @param pace 棋子记录
 * @returns
 */
const getBeforeMotion = (
  mapList: Array<PieceType | null>,
  pace: string
): number => {
  if (pace.length === 4) {
    let [t1, t2, t3, t4] = pace.split("") as RecordItemType;

    // 统一用第四个字判断红旗和黑棋
    const isRed = numbers_cn.includes(t4);
    // 第一个文字 棋子文字 ||  text1
    if (pieceTexts.includes(t1 as PieceTextType) && isRed) {
      numbers_cn.indexOf(t2);
    }
    // 第二个文字 棋子文字 || numbers || numbers_cn
    // 第三个文字 text3
    // 第四个文字 numbers || numbers_cn
  }
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

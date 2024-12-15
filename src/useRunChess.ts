import { ref, watch } from 'vue';
import {
  numbers,
  numbers_cn,
  text1,
  isNULL,
  isRED,
  indexToXY,
  piece_list,
  text3,
  getIndex,
} from './utils/data';
import { run_rule } from '@/utils/run-rule';
import { getText3 } from '@/utils/making-chess';
import { useAppStore } from './store';

export default function useRunChess() {
  const store = useAppStore();

  const allPieceText: string[] = piece_list.map((item) => item.text);
  const allNumber: (string | number)[] = [...numbers, ...numbers_cn];
  const qhText: string[] = text1;
  const jtpText: string[] = text3;

  const textRef = ref<string>('');
  const active = ref<number[]>([]);
  // 根据上一个文字得出下一个文字的预处理
  const nextText = ref<(number | string)[]>([]);

  /** 获取同一阵营的棋子文字 */
  const getAllEqualPieceText = () => {
    const type = store.next;
    // 前后判断，一列中有两个相同棋子，其他地方没有棋子，这个棋子不能获取，只有前后
    return store.list.reduce((acc, item) => {
      if (isNULL(item) || item.type !== type) return acc;
      if (acc.includes(item.text)) return acc;

      const xObj = getPieceIndex(item.text).reduce((acc, item) => {
        const { x } = indexToXY(item);
        acc[x] = acc[x] ? acc[x] + 1 : 1;
        return acc;
      }, {} as Record<number, number>);
      const xIndexs = Object.values(xObj).flat(2);
      if (!xIndexs.includes(1)) return acc;

      if (!acc.includes(item.text)) {
        acc.push(item!.text);
      }
      return acc;
    }, [] as string[]);
  };
  /** 根据文字去棋盘查找相同的棋子下标 */
  function getPieceIndex(text: string) {
    const type = store.next;
    return store.list.flatMap((item) => {
      if (isNULL(item) || item.type !== type) return [];
      const { text: pieceText, index } = item;

      return pieceText === text ? [index] : [];
    });
  }
  /** 根据文字去找 x 轴 */
  function getXByText(text: string) {
    const isRed = isRED(store.next);
    const num = isRed ? numbers_cn : numbers;

    return store.list.reduce((acc, item) => {
      if (isNULL(item) || text !== item.text || item.type !== store.next) {
        return acc;
      }
      const { x } = indexToXY(item.index);
      const xText = num[x];
      if (acc.includes(xText)) return acc;

      acc.push(xText);
      return acc;
    }, [] as (string | number)[]);
  }
  /** 根据 x 轴去找棋子 */
  function getPieceByX(x: number, text: string): PieceType | null {
    for (let i = 0; i < 100; i++) {
      const _index = getIndex(0, x);
      const _piece = store.list[_index];
      if (!isNULL(_piece) && _piece.type == store.next && _piece.text == text) {
        return _piece;
      }
    }
    return null;
  }
  /** 找出一列中相同棋子 */
  function findXPiece(len: number = 2) {
    const type = store.next;
    const isRed = isRED(type);
    // 找出同阵营的棋子，分 x 轴 code 聚集
    const group = store.list.reduce((acc, item) => {
      if (isNULL(item) || item.type !== type) return acc;
      const { x } = indexToXY(item.index);
      const key = `${x}-${item.code}`;

      acc[key] = [...(acc[key] ?? []), item];
      return acc;
    }, {} as Record<string, PieceType[]>);
    return Object.values(group).flatMap((item) =>
      item.length >= len ? [isRed ? item : item.toReversed()] : []
    );
  }

  /** 获取同一列的所有棋子 前后 中间的数字*/
  function getNum() {
    const yPiece = findXPiece();
    const maxXpiece = yPiece.reduce((acc, cur) => {
      return cur.length > acc ? cur.length : acc;
    }, 0);

    if (maxXpiece <= 2) return [];
    const num = isRED(store.next) ? numbers_cn.toReversed() : numbers;
    const res = [];
    for (let i = 1; i < maxXpiece - 1; i++) {
      res.push(num[i]);
    }
    return res;
  }

  function setText(text: string | number) {
    textRef.value += text;
  }
  function back() {
    if (textRef.value === null) return;
    textRef.value = textRef.value.slice(0, -1);
    active.value = [];
  }

  /** 初始化文字处理 */
  function initNextText() {
    const xPiece = findXPiece();
    /** 前 后 */
    const qhPiece: string[] = xPiece.length ? text1 : [];
    /** 获取所有棋子 */
    const allFilterPieceText = getAllEqualPieceText();

    /** 一列中最大的数字 第一个为前 最后一位的为后 中间的 为 2 3 4 。。。 二 三 四 。。。*/
    const maxNum = getNum();
    return [...allFilterPieceText, ...qhPiece, ...maxNum];
  }
  /** 一个文字处理 */
  function oneText(textRefValue: string) {
    const xPiece = findXPiece();

    // 第一个选中的是棋子, 下一个字为 数字
    if (allPieceText.includes(textRefValue)) {
      return getXByText(textRefValue);
    }
    // 前后 下一个字为 棋子文字
    if (qhText.includes(textRefValue)) {
      return xPiece.flat(2).reduce((acc, { text }) => {
        if (!acc.includes(text)) acc.push(text);
        return acc;
      }, [] as PieceTextType[]);
    }
    // 数字 下一个为 棋子文字
    if (allNumber.includes(textRefValue)) {
      return xPiece
        .flatMap((item) => {
          if (item.length >= 3) return item;
          return [];
        })
        .reduce((acc, { text }) => {
          if (!acc.includes(text)) acc.push(text);
          return acc;
        }, [] as PieceTextType[]);
    }
    return [];
  }
  /** 两个文字处理 */
  function twoText(textRefValue: string) {
    const xPiece = findXPiece();
    const isRed = isRED(store.next);
    const numText: (number | string)[] = isRed
      ? numbers_cn.toReversed()
      : numbers;
    const _numText: (number | string)[] = isRed ? numbers_cn : numbers;

    const [firstPiece, secondPiece] = textRefValue;

    // 根据第一个文字判断  炮二进二 二兵二进一 前兵二进一 前炮进二

    // 数字 二兵二进一 数字
    if (allNumber.includes(firstPiece)) {
      // 进 退 平
      const num_x = numText.indexOf(firstPiece);
      // 这里 应该是个兵，只有兵的数量才是大于2的
      const piece = xPiece.flatMap((item) => {
        return item.length > 2 ? item : [];
      })[num_x];
      const { x } = indexToXY(piece.index);

      return [_numText[x]];
    }
    // 棋子 炮二进二 进退平
    if (allPieceText.includes(firstPiece)) {
      const _x = _numText.indexOf(secondPiece);

      // 具体的棋子，应该是单一的
      const indexs = getPieceIndex(firstPiece).filter((item) => {
        const { x } = indexToXY(item);
        return _x == x;
      });

      if (!indexs.length) return [];

      const piece = store.list[indexs[0]];

      const afterIndexs = run_rule[piece!.code]!(store.list, piece!);

      return afterIndexs.reduce((acc, item) => {
        const text = getText3(piece!.index, item, piece!);
        if (!acc.includes(text)) acc.push(text);
        return acc;
      }, [] as PieceKinesis[]);
    }
    // 前后 前炮进二 前兵二进二 进退平 数字
    if (qhText.includes(firstPiece)) {
      const [QIAN] = qhText;
      const isMulticolumn = xPiece.length > 1;

      const _arr = xPiece.flatMap((item) => {
        const piece = firstPiece === QIAN ? item[0] : item.at(-1);
        let arr: (string | number)[] = [];
        if (!isMulticolumn) {
          const afterIndexs = run_rule[piece!.code]!(store.list, piece!);
          arr = afterIndexs.reduce((acc, item) => {
            const text = getText3(piece!.index, item, piece!);
            if (!acc.includes(text)) acc.push(text);
            return acc;
          }, [] as PieceKinesis[]);
        } else {
          if (piece!.text === secondPiece) {
            const { x } = indexToXY(piece!.index);

            const _x = _numText[x];
            arr = [_x];
          }
        }
        return arr;
      });

      return _arr;
    }
    return [];
  }
  /** 三个文字处理 */
  function threeText(textRefValue: string) {
    const xPiece = findXPiece();
    const isRed = isRED(store.next);
    const numText: (number | string)[] = isRed
      ? numbers_cn.toReversed()
      : numbers;
    const _numText: (number | string)[] = isRed ? numbers_cn : numbers;

    // 根据第一个文字判断  炮二进二 二兵二进一 前炮进二
    const [firstPiece, secondPiece, thirdPiece] = textRefValue;

    // 套用两个字的处理方式 =》第一个棋子文字 第二个数字
    // 二兵二进一 第三个文字是数字
    if (numText.includes(firstPiece)) {
      const _x = _numText.indexOf(thirdPiece);

      // 具体的棋子，应该是单一的
      const indexs = getPieceIndex(secondPiece).filter((item) => {
        const { x } = indexToXY(item);
        return _x == x;
      });

      if (!indexs.length) return [];

      const piece = store.list[indexs[0]];

      const afterIndexs = run_rule[piece!.code]!(store.list, piece!);

      return afterIndexs.reduce((acc, item) => {
        const text = getText3(piece!.index, item, piece!);
        if (!acc.includes(text)) acc.push(text);
        return acc;
      }, [] as PieceKinesis[]);
    }
    // 到这里已经确认了棋子 炮二进二 前炮进二  进退平
    let pieceText = allPieceText.includes(firstPiece)
      ? firstPiece
      : secondPiece;
    let piece: PieceType | null = null;
    // 炮二进二
    if (allPieceText.includes(firstPiece)) {
      const x = _numText.indexOf(secondPiece);
      piece = getPieceByX(x, pieceText)!;
    }
    // 前炮进二 判断前后
    else if (qhText.includes(firstPiece)) {
      const [QIAN] = text1;
      piece = xPiece.flatMap((item) => {
        if (item[0].text == secondPiece) {
          return [firstPiece == QIAN ? item[0] : item.at(-1)];
        }
        return [];
      })[0]!;

      // const afterIndexs = run_rule[piece!.code]!(store.list, piece!);
    }

    console.log(piece, pieceText);

    console.log(textRefValue);
    return [];
  }

  watch(
    () => textRef.value,
    (textRefValue) => {
      console.time('watch');
      // 开局
      if (!textRefValue) {
        nextText.value = initNextText();
      }
      // 第一个文字
      if (textRefValue?.length === 1) {
        nextText.value = oneText(textRefValue);
      }
      // 第二个文字
      if (textRefValue?.length === 2) {
        nextText.value = twoText(textRefValue);
      }
      // 第三个文字
      if (textRefValue?.length === 3) {
        nextText.value = threeText(textRefValue);
      }
      console.timeEnd('watch');
    },
    { deep: true, immediate: true }
  );

  watch(
    () => store.list,
    () => {
      nextText.value = initNextText();
    },
    { deep: true }
  );

  return { text: textRef, setText, active, back, nextText };
}

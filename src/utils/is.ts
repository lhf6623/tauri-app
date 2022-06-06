export const is = (o: any) => {
  return Object.prototype.toString.call(o);
};

export const isObject = (o: any) => {
  return is(o) === "[object Object]";
};

export const isArray = (o: any) => {
  return Array.isArray(o);
};

export const isMap = (o: any) => {
  return is(o) === "[object Map]";
};

export const isSet = (o: any) => {
  return is(o) === "[object Set]";
};

export const isFunction = (o: any) => {
  return is(o) === "[object Function]";
};

export const cloneDeep = (val: any) => {
  if (isArray(val) || isObject(val)) {
    return JSON.parse(JSON.stringify(val));
  } else {
    return val;
  }
};

export const isMatch = (
  v1: Record<string, any>,
  v2: Record<string, any>
): boolean => {
  let v2_arr = Object.entries(v2);
  for (let i = 0; i < v2_arr.length; i++) {
    let [key, value] = v2_arr[i];
    if (v1[key] !== value) {
      return false;
    }
  }
  return true;
};
/**
 * 有枚举属性的对象,不可枚举或者 length 属性为零 返回true
 * @param val any
 * @returns
 */
export const isEmpty = (val: any): boolean => {
  if (val?.length) return val.length === 0;
  if (val?.size) return val.size === 0;

  if (val === undefined || val === null) {
    return true;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return true;
};

/**
 * 检查 n 是否在 start 与 end 之间，但不包括 end。
 * 如果 end 没有指定，那么 start 设置为0。
 * 如果 start 大于 end，那么参数会交换以便支持负范围。
 * @param val
 * @param start
 * @param end
 * @returns
 */
export const inRange = (val: number, start = 0, end?: number): boolean => {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  if (start > end) {
    [start, end] = [end, start];
  }
  return val >= start && val < end;
};

/**
 * 根据 precision（精度） 向上舍入 number。（注： precision（精度）可以理解为保留几位小数。）
 * @param val
 * @param precision
 */
export const ceil = (val: number, precision = 0): number => {
  return Math.ceil(val * 10 ** precision) / 10 ** precision;
};

/**
 * 延迟 wait 毫秒后调用 func。 调用时，任何附加的参数会传给func。
 * @param func
 * @param ms
 */
export const delay = (
  func: (arg0: any) => void,
  ms: number,
  ...args: any[]
) => {
  if (!isFunction(func)) {
    throw new TypeError("delay must be a function");
  }
  return setTimeout(func, ms, ...args);
};

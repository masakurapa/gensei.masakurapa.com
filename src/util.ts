/**
 * 0 ~ n までのランダムな数字を返す
 * @param  {number} n
 * @returns number
 */
export const random = (n: number): number => {
    return Math.floor(Math.random() * n);
};

/**
 * 0 ~ n までのランダムな偶数を返す
 * @param  {number} n
 * @returns number
 */
export const randomEven = (n: number): number => {
    return random(n / 2) * 2;
};

/**
 * 0 ~ n までのランダムな奇数を返す
 * @param  {number} n
 * @returns number
 */
export const randomOdd = (n: number): number => {
    return random(n / 2) * 2 + 1;
};

/**
 * スリープ用のPromiseを返す
 * @param  {number} ms
 * @returns Promise
 */
export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
};

/**
 * string -> int
 * @param  {string} val
 * @returns number
 */
export const toInt = (val: string): number => {
    return parseInt(val, 10);
}

/**
 * 配列をシャッフルする
 * @param  {T[]} target
 * @returns T
 */
export const shuffle = <T> (target: T[]): T[] => {
    const result = target.concat();
    for (let i = result.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1));
        const tmp = result[i];
        result[i] = result[r];
        result[r] = tmp;
    }
    return result;
};

/**
 * UAがスマートフォンか判定する
 * @returns boolean
 */
export const isSmartPhone = (): boolean => {
    const ua = navigator.userAgent;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
        return true;
    } else {
        return false;
    }
};

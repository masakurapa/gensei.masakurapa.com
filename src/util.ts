/**
 * 0 ~ n までのランダムな数字を返す
 */
export const random = (n: number): number => {
    return Math.floor(Math.random() * n)
}

/**
 * 0 ~ n までのランダムな偶数を返す
 */
export const randomEven = (n: number): number => {
    return random(n / 2) * 2
}

/**
 * 0 ~ n までのランダムな奇数を返す
 */
export const randomOdd = (n: number): number => {
    return random(n / 2) * 2 + 1
}

/**
 * スリープ用のPromiseを返す
 */
export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

// FIXME: 型定義
/**
 * 配列をシャッフルする
 * @param {array} target
 * @return {array}
 */
export const shuffle = (target) => {
    const result = target.concat()
    for (let i = result.length - 1; i > 0; i--) {
        const r = Math.floor(Math.random() * (i + 1))
        const tmp = result[i]
        result[i] = result[r]
        result[r] = tmp
    }
    return result
}

/**
 * UAがスマートフォンか判定する
 */
export const isSmartPhone = (): boolean => {
    const ua = navigator.userAgent
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
        return true
    } else {
        return false
    }
}

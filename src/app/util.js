/**
 * 0 ~ n までのランダムな数字を返す
 * @param {number} n
 */
export const random = (n) => {
    return Math.floor(Math.random() * n)
}

/**
 * 0 ~ n までのランダムな偶数を返す
 * @param {number} n
 */
export const randomEven = (n) => {
    return random(n / 2) * 2
}

/**
 * 0 ~ n までのランダムな奇数を返す
 * @param {number} n
 */
export const randomOdd = (n) => {
    return random(n / 2) * 2 + 1
}

/**
 * スリープ用のPromiseを返す
 * @param {number} ms
 * @return {Promise}
 */
export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

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

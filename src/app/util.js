// 0 ~ n までのランダムな数字を返す
export const random = (n) => {
    return Math.floor(Math.random() * n)
}

// 0 ~ n までのランダムな偶数を返す
export const randomEven = (n) => {
    return random(n / 2) * 2
}

// 0 ~ n までのランダムな奇数を返す
export const randomOdd = (n) => {
    return random(n / 2) * 2 + 1
}

// スリープ用のPromiseを返す
export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}

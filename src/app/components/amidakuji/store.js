import { writable } from 'svelte/store'

// 線を引ける行数
export const lineNum = writable(5)
// リセットするまで線を引き直させないためのフラグ
export const disabledWriteLine = writable(false)
// 選ばれた順番を保持する
export const rank = writable(1)
// あみだくじ
export const amidakuji = writable([])
// あたりのユーザーリスト
export const selectedUserList = writable([])
// 抽選済みの番号を保持する
export const selectedNumber = writable([])

// 線を引ける行数を設定
export const setLineNum = (num) => {
    lineNum.set(parseInt(num, 10))
}

// 線を引ける行数を設定
export const setRank = (num) => {
    rank.set(parseInt(num, 10))
}

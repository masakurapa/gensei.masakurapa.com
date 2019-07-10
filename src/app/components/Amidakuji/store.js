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

// 線を引ける行数を設定
export const setLineNum = (num) => {
    lineNum.set(parseInt(num, 10))
}

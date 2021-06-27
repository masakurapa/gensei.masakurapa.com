import { writable } from 'svelte/store'
import type { Amidakuji } from '../../@types/amidakuji';
import type { AmidakujiUserList } from '../../@types/user';

// 線を引ける行数
export const lineNum = writable(5)
// リセットするまで線を引き直させないためのフラグ
export const disabledWriteLine = writable(false)
// 選ばれた順番を保持する
export const rank = writable(1)
// あみだくじ
export const amidakuji = writable<Amidakuji>([])
// あたりのユーザーリスト
export const selectedUserList = writable<AmidakujiUserList>([])
// 抽選済みの番号を保持する
export const selectedNumber = writable<number[]>([])

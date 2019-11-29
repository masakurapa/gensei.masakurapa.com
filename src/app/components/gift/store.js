import { writable, get } from 'svelte/store'

// 抽選中の機能ブロックフラグ
export const blocking = writable(false)
// 景品データ
export const giftList = writable([])
// 抽選対象データ
export const userList = writable([])
// 許容する重複当選数
export const duplicatePrizeCnt = writable(1)
// 抽選結果用のキャンバス
let no = 1
export const canvases = writable([])

// 重複当選数を設定
export const setDuplicatePrizeCnt = (num) => {
    duplicatePrizeCnt.set(parseInt(num, 10))
}

// キャンバスを追加
export const addCanvas = () => {
    const tmpCanvas = get(canvases)
    if (tmpCanvas.length >= get(giftList).length) {
        return
    }
    canvases.update(value => {
        value.push({ no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0 })
        return value
    })
}

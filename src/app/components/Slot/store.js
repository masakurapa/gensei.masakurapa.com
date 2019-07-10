import { writable } from 'svelte/store'

// 抽選人数
export const choiceNum = writable(1)

// 人数の最大数(15個)分のcanvas系の設定を事前に用意しておく
let no = 1
export const canvases = writable([
    { no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0, frameId: null },
    { no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0, frameId: null },
    { no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0, frameId: null },
    { no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0, frameId: null },
    { no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0, frameId: null },
    { no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0, frameId: null },
    { no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0, frameId: null },
    { no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0, frameId: null },
    { no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0, frameId: null },
    { no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0, frameId: null },
    { no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0, frameId: null },
    { no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0, frameId: null },
    { no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0, frameId: null },
    { no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0, frameId: null },
    { no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0, frameId: null },
])

// 抽選人数を設定
export const setChoiceNum = (num) => {
    choiceNum.set(parseInt(num, 10))
}

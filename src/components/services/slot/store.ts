import { writable } from 'svelte/store';
import type { CanvasList } from '../../../@types/canvas';

// 抽選人数
export const choiceNum = writable(1);

// 人数の最大数(30個)分のcanvas系の設定を事前に用意しておく
let no = 1
export const canvases = writable<CanvasList>([...Array(30)].map(() => {
    return { no: no++, canvas: null, ctx: null, offset: 0, offsetV: 0, end: 0, frameId: null };
}));

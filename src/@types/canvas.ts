/**
 * ユーザー情報
 */
export interface Canvas {
    no: number;
    canvas?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;
    offset: number;
    offsetV: number;
    end: number;
    frameId?: number;
};

/**
 * ユーザー情報のリスト
 */
export type CanvasList = Canvas[];

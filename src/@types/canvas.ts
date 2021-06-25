/**
 * ユーザー情報
 */
export interface canvasRow {
    no: number;
    canvas?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;
    offset: number;
    offsetV: number;
    end: number;
};

/**
 * ユーザー情報のリスト
 */
export type canvasList = canvasRow[];

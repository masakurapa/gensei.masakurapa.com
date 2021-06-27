/**
 * 線の種別
 */
export const Flag = {
    OFF: 0,
    ON: 1,
    NONE: 2,
} as const;

/**
 * 線の種別の型
 */
export type Flag = typeof Flag[keyof typeof Flag];;

/**
 * あみだくじの線
 */
export interface Line {
    /** 線の種別 */
    flag: Flag;
    /** background-colorのwidth/heightの割合 */
    size: number;
    /** 通った道 */
    active: boolean;
    /** 右から左に線を移動するためのフラグ */
    rivers: boolean;
};

/**
 * 縦軸
 */
export type Vertical = Line[];

/**
 * あみだくじ（横軸）
 */
export type Amidakuji = Vertical[];

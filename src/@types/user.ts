/**
 * ユーザー情報
 */
export interface User {
    id: number;
    name: string;
};

/**
 * ユーザー情報のリスト
 */
export type UserList = User[];

/**
 * ユーザー情報（ランダム抽選用）
 */
 export interface RandomSelectUser extends User {
    count: number;
    rank: number;
};

/**
 * ユーザー情報のリスト（ランダム抽選用）
 */
export type RandomSelectUserList = RandomSelectUser[];

/**
 * ユーザー情報（あみだくじ用）
 */
 export interface AmidakujiUser extends User {
    rank: number; // 何番目に選ばれたか
    order: number; // 何番目に数字ボタンを押したか
    position: number; // 何番のボタンを押したか
};

/**
 * ユーザー情報のリスト（あみだくじ用）
 */
export type AmidakujiUserList = AmidakujiUser[];

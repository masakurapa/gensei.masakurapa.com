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
    id: number;
    name: string;
    count: number;
    rank: number;
};

/**
 * ユーザー情報のリスト（ランダム抽選用）
 */
export type RandomSelectUserList = RandomSelectUser[];


import { writable, get } from 'svelte/store';
import type { User } from '../../@types/user';

// チームの分割数
export const teamNum = writable(1);
// 抽選データ
export const userList = writable<string[]>([]);
// 均等に人数を振り分けるかのフラグ
export const equalityFlag = writable(true);
// 抽選結果
export const resultUserList = writable<User[][]>([[]]); // FIXME: 型定義

// 抽選結果を初期化
export const resetResultUserList = (): void => {
    const users = [];
    for (let i = 1; i <= get(teamNum); i++) {
        users.push([]);
    }
    resultUserList.set(users);
};

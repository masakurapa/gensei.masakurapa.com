import { writable, get } from 'svelte/store';
import type { User, UserList } from './@types/user';

// ユーザーリスト
export const userList = writable<UserList>([]);
// 処理中フラグ
export const processing = writable(false);
// ユーザーリストの表示フラグ
export const showUserList = writable(true);
// UID
export const uid = writable(1);

// ユーザーリストの操作関数
export const addUser = function (name: string) {
    const item: User = { name, id: get(uid) };
    userList.update(items => [...items, item]);
    uid.update(id => id + 1);
};
export const setUser = function (value: UserList) {
    userList.set(value);
    uid.set(value.length + 1);
};
export const removeUser = function (id: number) {
    userList.set(get(userList).filter(row => row.id !== id));
};

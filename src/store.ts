import { writable, get } from 'svelte/store';
import type { User, UserList } from './@types/user';

// ユーザーリスト
export const userList = writable<UserList>([]);
// 処理中フラグ
export const processing = writable(false);
/**
 * ユーザーリストの表示フラグ
 * TODO: legacy削除後に未使用になる
 */
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
    // idが歯抜けになっているとduplicate keysが出るので1から振り直す
    const users: UserList = [];
    value.forEach((val, idx) => {
        users.push({ name: val.name, id: idx + 1 });
    });
    userList.set(users);
    uid.set(users.length + 1);
};
export const removeUser = function (id: number) {
    userList.set(get(userList).filter(row => row.id !== id));
};

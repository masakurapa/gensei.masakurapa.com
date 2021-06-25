import type { UserList } from './@types/user';

const lotKey = 'lotType';
const userListKey = 'userList';

/**
 * 抽選方法をローカルストレージに保存する
 */
export const setLot = (val: string) => {
    return setItem(lotKey, val);
};

/**
 * 抽選方法をローカルストレージから取得する
 */
export const getLot = (): string => {
    return getItem(lotKey);
};

/**
 * 抽選方法をローカルストレージから削除する
 */
export const removeLot = (): void => {
    removeItem(lotKey);
};

/**
 * ユーザーリストをローカルストレージに保存する
 */
export const setUserList = (userList: UserList): boolean => {
    return setItem(userListKey, JSON.stringify(userList));
};

/**
 * ローカルストレージからユーザーリストを取得する
 */
export const getUserList = (): UserList => {
    const val = getItem(userListKey);
    if (val === null) {
        return [];
    }
    const userList: UserList = JSON.parse(window.localStorage.getItem(userListKey));
    return userList !== null ? userList : [];
};

/**
 * ローカルストレージに保存
 */
export const setItem = (key: string, val: string): boolean => {
    try {
        window.localStorage.setItem(key, val);
        return true;
    } catch (e) {
        return false;
    }
};

/**
 * ローカルストレージから取得
 */
export const getItem = (key: string): string|null => {
    try {
        return window.localStorage.getItem(key);
    } catch (e) {
        return null;
    }
};

/**
 * ローカルストレージから削除
 */
export const removeItem = (key: string): void => {
    try {
        window.localStorage.removeItem(key);
    } catch (e) {
        // 失敗しても何もしない
    }
};

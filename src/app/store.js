import { writable, get } from 'svelte/store'

// ユーザーリスト
export const userList = writable([])
// 処理中フラグ
export const processing = writable(false)
// ユーザーリストの表示フラグ
export const showUserList = writable(true)
// UID
export const uid = writable(1)

// ユーザーリストの操作関数
export const addUser = function (value) {
    const item = { id: get(uid), name: value }
    userList.update(items => [...items, item])
    uid.update(id => id + 1)
}
export const setUser = function (value) {
    userList.set(value)
    uid.set(value.length + 1)
}
export const removeUser = function (id) {
    userList.set(get(userList).filter(row => row.id !== id))
}

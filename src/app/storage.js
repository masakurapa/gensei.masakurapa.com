const lotKey = 'lotType'
const userListKey = 'userList'

// 抽選方法をローカルストレージに保存する
export const setLot = function (val) {
    return setItem(lotKey, val)
}

// 抽選方法をローカルストレージから取得する
export const getLot = function () {
    return getItem(lotKey)
}

// 抽選方法をローカルストレージから削除する
export const removeLot = function () {
    return removeItem(lotKey)
}

// ユーザーリストをローカルストレージに保存する
export const setUserList = function (userList) {
    return setItem(userListKey, JSON.stringify(userList))
}

// ローカルストレージからユーザーリストを取得する
export const getUserList = function () {
    const val = getItem(userListKey)
    if (val === null) {
        return []
    }
    const userList = JSON.parse(window.localStorage.getItem(userListKey))
    return userList !== null ? userList : []
}

// ローカルストレージに保存
export const setItem = (key, val) => {
    try {
        window.localStorage.setItem(key, val)
        return true
    } catch (e) {
        return false
    }
}

// ローカルストレージから取得
export const getItem = (key) => {
    try {
        return window.localStorage.getItem(key)
    } catch (e) {
        return null
    }
}

// ローカルストレージから削除
export const removeItem = (key) => {
    try {
        return window.localStorage.removeItem(key)
    } catch (e) {
        return null
    }
}

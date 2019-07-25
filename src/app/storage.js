const userListKey = 'userList'

// ユーザーリストをローカルストレージに保存する
export const setUserList = function (userList) {
    try {
        window.localStorage.setItem(userListKey, JSON.stringify(userList))
        return true
    } catch (e) {
        return false
    }
}

// ローカルストレージからユーザーリストを取得する
export const getUserList = function () {
    try {
        const userList = JSON.parse(window.localStorage.getItem(userListKey))
        return userList !== null ? userList : []
    } catch (e) {
        return []
    }
}

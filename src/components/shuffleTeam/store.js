import { writable, get } from 'svelte/store'

// チームの分割数
export const teamNum = writable(1)
// 抽選データ
export const userList = writable([])
// 均等に人数を振り分けるかのフラグ
export const equalityFlag = writable(true)
// 抽選結果
export const resultUserList = writable([[]])

// チームの分割数を設定
export const setTeamNum = (num) => {
    teamNum.set(parseInt(num, 10))
}
// 抽選結果を初期化
export const resetResultUserList = () => {
    const users = []
    for (let i = 1; i <= get(teamNum); i++) {
        users.push([])
    }
    resultUserList.set(users)
}

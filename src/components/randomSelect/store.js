import { writable, readable, get } from 'svelte/store'

// 厳正度のステップ（range用）
export const trialCountStep = readable(10000)

// 厳正度
export const trialCount = writable(get(trialCountStep))
// 抽選人数
export const choiceNum = writable(1)
// 抽選データ
export const tempUserList = writable([])

// 厳正度を設定
export const setTrialCount = (num) => {
    trialCount.set(parseInt(num, 10))
}
// 抽選人数を設定
export const setChoiceNum = (num) => {
    choiceNum.set(parseInt(num, 10))
}
// 抽選データを初期化する
export const resetTempUserList = (userList) => {
    tempUserList.set(userList.map((item) => {
        return {
            id: item.id,
            name: item.name,
            count: 0,
            rank: 0,
        }
    }))
}

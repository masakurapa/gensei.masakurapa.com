import { writable, readable, get } from 'svelte/store';
import type { UserList, RandomSelectUserList } from '../../@types/user';

// 厳正度のステップ（range用）
export const trialCountStep = readable(10000);

// 厳正度
export const trialCount = writable(get(trialCountStep));
// 抽選人数
export const choiceNum = writable(1);
// 抽選データ
export const tempUserList = writable<RandomSelectUserList>([]);

// 抽選データを初期化する
export const resetTempUserList = (userList: UserList): void => {
    tempUserList.set(userList.map((item) => {
        return {
            id: item.id,
            name: item.name,
            count: 0,
            rank: 0,
        };
    }));
};

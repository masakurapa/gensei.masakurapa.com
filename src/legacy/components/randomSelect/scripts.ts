import { get } from 'svelte/store';

import type { InputEvent } from '../../../@types/event';
import type { UserList } from '../../../@types/user';

import { userList, processing } from '../../../store';
import { random, sleep, toInt } from '../../../util';

import { trialCount, choiceNum, tempUserList, resetTempUserList } from './store';


export const MIN_CHOICE_NUM = 1;

/**
 * @param  {InputEvent} event
 * @returns void
 */
export const onInputChoiceNum = (event: InputEvent): void => {
    choiceNum.set(toInt(event.target.value));
};

/**
 * @param  {UserList} value
 * @returns void
 */
export const subscribeChoiceNum = (value: UserList): void => {
    if (value.length === 0) {
        choiceNum.set(MIN_CHOICE_NUM);
        return;
    }
    const current = get(choiceNum);
    choiceNum.set(current > value.length ? value.length : current);
}

/**
 * @param  {InputEvent} event
 * @returns void
 */
export const onInputTrialCount = (event: InputEvent): void => {
    trialCount.set(toInt(event.target.value));
};

/**
 * 抽選処理
 * @returns Promise<void>
 */
export const lottery = async (): Promise<void> => {
    processing.set(true);
    resetTempUserList(get(userList));
    const temp = get(tempUserList);

    const trial = get(trialCount);
    const choice = get(choiceNum);

    await sleep(1000);

    let rank = 1;
    while (temp.filter(item => item.count >= trial).length < choice) {
        const i = random(temp.length);
        temp[i].count += 1;
        if (temp[i].count === trial) {
            await sleep(500);
            temp[i].rank = rank++;
            tempUserList.set(temp);
        }
    }

    await sleep(1000);
    processing.set(false);
};

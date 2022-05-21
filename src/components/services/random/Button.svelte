<PrimaryBtn
    size="large"
    {disabled}
    on:click="{run}"
>{$processing ? '抽選中！' : '抽選開始！'}</PrimaryBtn>

<script lang="ts">
    import { userList, processing } from '../../../store';
    import { random, sleep } from '../../../util';
    import { trialCount, choiceNum, tempUserList, resetTempUserList } from './store';

    import PrimaryBtn from '../../parts/buttons/Primary.svelte';

    // ボタン無効判定
    $: disabled = $userList.length === 0 || $processing;

    // 抽選処理
    const run = async (): Promise<void> => {
        processing.set(true);
        resetTempUserList($userList);
        const temp = $tempUserList;

        await sleep(1000);

        let rank = 1;
        while (temp.filter(item => item.count >= $trialCount).length < $choiceNum) {
            const i = random(temp.length);
            temp[i].count += 1;
            if (temp[i].count === $trialCount) {
                await sleep(500);
                temp[i].rank = rank++;
                tempUserList.set(temp);
            }
        }

        await sleep(1000);
        processing.set(false);
    };
</script>

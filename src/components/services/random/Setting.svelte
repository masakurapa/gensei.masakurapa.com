<Accordion id="random" title="設定" open>
    <FormWrapper>
        <span slot="label">抽選数</span>
        <Number
            value="{$choiceNum}"
            min={CHOICE_NUM_MIN}
            max={choiceNumMax}
            on:change={onChangeChoiceNum}
        />
    </FormWrapper>

    <FormWrapper>
        <span slot="label">n回選ばれるまで抽選</span>
        <Number
            value="{$trialCount}"
            min={$trialCountStep}
            max={$trialCountStep * 100}
            step="{$trialCountStep}"
            on:change={onChangeTrialCount}
        />
    </FormWrapper>
</Accordion>

<script lang="ts">
    import type { InputEvent } from '../../../@types/event';

    import { userList } from '../../../store';
    import { toInt } from '../../../util';

    import {
        choiceNum,
        trialCount,
        trialCountStep,
        resetTempUserList,
    } from './store';

    import Accordion from '../../accordion/Accordion.svelte';
    import FormWrapper from '../../forms/Wrapper.svelte';
    import Number from '../../forms/Number.svelte';

    // 抽選人数の最小数
    const CHOICE_NUM_MIN = 1;
    // 抽選人数の最大数
    $: choiceNumMax = $userList.length > 0 ? $userList.length : CHOICE_NUM_MIN;

    // ユーザーリスト更新時に設定値を再初期化
    userList.subscribe((value) => {
        // 抽選対象のユーザーリストをリセット
        resetTempUserList(value);

        // 抽選数の再計算
        if (value.length === 0) {
            choiceNum.set(CHOICE_NUM_MIN);
            return;
        }
        choiceNum.set($choiceNum > value.length ? value.length : $choiceNum);
    })

    // 抽選数変更時のイベント
    // TODO: any type
    const onChangeChoiceNum = (event: InputEvent|any): void => {
        choiceNum.set(toInt(event.detail.value));
    };

    // 試行回数変更時のイベント
    // TODO: any type
    const onChangeTrialCount = (event: InputEvent|any): void => {
        trialCount.set(toInt(event.detail.value));
    };
</script>

<Accordion id="random" title="設定" open>
    <FormWrapper>
        <span slot="label">抽選数</span>
        <Number
            value="{$choiceNum}"
            min={CHOICE_NUM_MIN}
            max={maxChoiceNum}
            on:change={onChangeChoiceNum}
        />
    </FormWrapper>
</Accordion>

<script lang="ts">
    import type { InputEvent } from '../../../@types/event';

    import Accordion from '../../parts/accordion/Accordion.svelte';
    import FormWrapper from '../../parts/forms/Wrapper.svelte';
    import Number from '../../parts/forms/Number.svelte';

    import { userList } from '../../../store';
    import { toInt } from '../../../util';

    import { choiceNum } from './store';

    // 抽選数の最低数
    const CHOICE_NUM_MIN = 1;

    userList.subscribe(value => {
        if (value.length === 0) {
            choiceNum.set(CHOICE_NUM_MIN);
            return;
        }
        choiceNum.set($choiceNum > value.length ? value.length : $choiceNum);
    })

    // 抽選人数の最大数
    $: maxChoiceNum = $userList.length > 0 ? $userList.length : CHOICE_NUM_MIN;

    const onChangeChoiceNum = (event: InputEvent|any): void => {
        choiceNum.set(toInt(event.detail.value));
    };
</script>

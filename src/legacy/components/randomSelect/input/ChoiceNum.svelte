<InputGroup label="抽選対象から <span class='bold-text'>{$choiceNum}個</span> 抽選する">
    <InputRange
        value={$choiceNum}
        max="{maxChoiceNum}"
        on:input="{onInput}"
    ></InputRange>
</InputGroup>

<script lang="ts">
    import type { InputEvent } from '../../../../@types/event';
    import { userList } from '../../../../store';
    import { choiceNum } from '../store';

    import InputGroup from '../../../parts/input/InputGroup.svelte';
    import InputRange from '../../../parts/input/InputRange.svelte';

    // 抽選数の最低数
    const choiceNumMin = 1;

    userList.subscribe(value => {
        if (value.length === 0) {
            choiceNum.set(choiceNumMin);
            return;
        }
        choiceNum.set($choiceNum > value.length ? value.length : $choiceNum);
    })

    // 抽選人数の最大数
    $: maxChoiceNum = $userList.length > 0 ? $userList.length : choiceNumMin;

    const onInput = (event: InputEvent): void => {
        choiceNum.set(parseInt(event.target.value, 10));
    };
</script>

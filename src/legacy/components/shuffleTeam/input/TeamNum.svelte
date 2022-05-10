<InputGroup label="抽選対象を <span class='bold-text'>{$teamNum}</span> チームに分ける">
    <InputRange
        value={$teamNum}
        max="{maxTeamNum}"
        on:input="{onInput}"
        on:change="{() => resetResultUserList()}"
    ></InputRange>
</InputGroup>

<script lang="ts">
    import type { InputEvent } from '../../../../@types/event';
    import { userList, teamNum, resetResultUserList } from '../store';

    import InputGroup from '../../../parts/input/InputGroup.svelte';
    import InputRange from '../../../parts/input/InputRange.svelte';

    // 抽選数の最低数
    const choiceNumMin = 1;

    userList.subscribe(value => {
        if (value.length === 0) {
            teamNum.set(choiceNumMin);
            return;
        }
        teamNum.set($teamNum > value.length ? value.length : $teamNum);
    })

    // 抽選人数の最大数
    $: maxTeamNum = $userList.length > 0 ? $userList.length : choiceNumMin;

    const onInput = (event: InputEvent): void => {
        teamNum.set(parseInt(event.target.value, 10));
    };
</script>

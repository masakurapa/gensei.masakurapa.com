<InputGroup label="抽選対象を <span class='bold-text'>{$teamNum}</span> チームに分ける</label>">
    <InputRange
        value={$teamNum}
        max="{maxTeamNum}"
        on:input="{(event) => setTeamNum(event.target.value)}"
        on:change="{() => resetResultUserList()}"
    ></InputRange>
</InputGroup>

<script>
    import { userList, teamNum, setTeamNum, resetResultUserList } from 'components/shuffleTeam/store.js'

    import InputGroup from 'parts/input/InputGroup.svelte'
    import InputRange from 'parts/input/InputRange.svelte'

    // 抽選数の最低数
    const choiceNumMin = 1

    userList.subscribe(value => {
        if (value.length === 0) {
            teamNum.set(choiceNumMin)
            return
        }
        teamNum.set($teamNum > value.length ? value.length : $teamNum)
    })

    // 抽選人数の最大数
    $: maxTeamNum = $userList.length > 0 ? $userList.length : choiceNumMin
</script>

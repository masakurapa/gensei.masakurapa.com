<InputGroup label="抽選対象から <span class='bold-text'>{$choiceNum}個</span> 抽選する</label>">
    <InputRange
        value={$choiceNum}
        max="{maxChoiceNum}"
        on:change="{(event) => { setChoiceNum(event.target.value) }}"
    ></InputRange>
</InputGroup>

<script>
    import { userList } from '../../../store.js'
    import { choiceNum, setChoiceNum } from '../store.js'

    import InputGroup from '../../../forms/InputGroup.svelte'
    import InputRange from '../../../forms/InputRange.svelte'

    // 抽選数の最低数
    const choiceNumMin = 1

    userList.subscribe(value => {
        if (value.length === 0) {
            choiceNum.set(choiceNumMin)
            return
        }
        choiceNum.set($choiceNum > value.length ? value.length : $choiceNum)
    })

    // 抽選人数の最大数
    $: maxChoiceNum = $userList.length > 0 ? $userList.length : choiceNumMin
</script>

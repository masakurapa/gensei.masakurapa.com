<InputGroup label="抽選対象（10文字以内） <span class='bold-text'>{$userList.length}</span>/{userListMax}">
    <InputText
        {disabled}
        value="{inputValue}"
        placeholder="Enterを押して対象を追加"
        on:keydown={keydown}
        on:change={onchange}
        size="25"
        maxlength="10"
    />
    <button
        {disabled}
        on:click="{click}"
    >追加</button>
</InputGroup>

<script>
    import { userList, processing, addUser } from '../store.js'
    import InputGroup from './InputGroup.svelte'
    import InputText from './InputText.svelte'

    // userList更新時に動かしたい関数
    export let subscribe = () => {}

    let inputValue = ''

    userList.subscribe((value) => {
        subscribe(value)
    })

    // 入力可能な対象の最大数
    const userListMax = 15
    // ユーザー追加の無効判定
    $: disabled = $processing || $userList.length >= userListMax

    function click () {
        if (inputValue.trim().length === 0) {
            return
        }
        addUser(inputValue.trim())
        inputValue = ''
    }

    function onchange (event) {
        inputValue = event.target.value
    }

    function keydown (event) {
        // event: 13 == Enterキー
        if (event.which !== 13 || event.target.value.trim().length === 0) {
            return
        }
        addUser(event.target.value.trim())
        event.target.value = ''
        inputValue = ''
    }
</script>

<style>
    button {
        width: 5em;
        margin-left: 1em;
        padding: 0.5em;
        box-sizing: border-box;
        border: 0.05em solid #ccc;
        border-radius: 0.25em;
        background-color: #1976d2 !important;
        color: #FFFFFF;
        outline: none;
        cursor: pointer;
    }
    button:disabled {
        background-color: #ddd !important;;
        cursor: unset;
    }
</style>

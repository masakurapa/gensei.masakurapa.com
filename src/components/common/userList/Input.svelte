<InputGroup label="抽選対象（{userNameMax}文字以内） <span class='bold-text'>{$userList.length}</span>/{userListMax}">
    <InputText
        {disabled}
        value="{inputValue}"
        placeholder="Enterを押して追加"
        on:keydown={keydown}
        on:change={onChange}
        size={20}
        maxlength={userNameMax}
    />
    <button
        {disabled}
        on:click="{click}"
    >追加</button>
</InputGroup>

<script lang="ts">
    import type { InputEvent, KeyEvent } from '../../../@types/event';

    import { userList, processing, addUser } from '../../../store';
    import InputGroup from '../../../parts/input/InputGroup.svelte';
    import InputText from '../../../parts/input/InputText.svelte';

    let inputValue = '';

    // 入力可能な文字数
    const userNameMax = 10;
    // 入力可能な対象の最大数
    const userListMax = 15;
    // ユーザー追加の無効判定
    $: disabled = $processing || $userList.length >= userListMax;

    const click = (): void => {
        if (inputValue.trim().length === 0) {
            return;
        }
        addUser(inputValue.trim());
        inputValue = '';
    };

    const onChange = (event: InputEvent): void => {
        inputValue = event.target.value;
    };

    const keydown = (event: KeyEvent): void => {
        console.log(event);
        if (event.key !== 'Enter' || event.keyCode !== 13 || event.target.value.trim().length === 0) {
            return;
        }
        addUser(event.target.value.trim());
        event.target.value = '';
        inputValue = '';
    };
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

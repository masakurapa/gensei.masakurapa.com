<FormWrapper>
    <span slot="label">抽選対象（{USER_NAME_MAX}文字以内）</span>

    <div class="input__wrapper">
        <TextBox
            {disabled}
            value="{inputValue}"
            placeholder="Enterを押して追加"
            on:keydown={keydown}
            on:change={onChange}
            size={24}
            maxlength={USER_NAME_MAX}
        />
        <div class="btn__wrapper">
            <PrimaryBtn
                size="40_60"
                {disabled}
                on:click="{click}"
            >追加</PrimaryBtn>
        </div>
    </div>
</FormWrapper>

<div class="user_list">
    <div class="user_list__header">({$userList.length}/{USER_LIST_MAX})</div>
    <div class="user_list__item">
        {#each $userList as item (item.id)}
            <Chip on:click={() => removeUser(item.id)}>{item.name}</Chip>
        {/each}
    </div>
</div>

<script lang="ts">
    import type { InputEvent, KeyEvent } from '../../../@types/event';

    import {
        userList,
        processing,
        addUser,
        removeUser,
     } from '../../../store';

    import Chip from '../chip/ChipWithDelete.svelte';
    import FormWrapper from '../forms/Wrapper.svelte';
    import TextBox from '../forms/TextBox.svelte';
    import PrimaryBtn from '../buttons/Primary.svelte';

    let inputValue = '';

    // 入力可能な文字数
    const USER_NAME_MAX = 10;
    // 入力可能な対象の最大数
    const USER_LIST_MAX = 30;
    // ユーザー追加の無効判定
    $: disabled = $processing || $userList.length >= USER_LIST_MAX;

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
        if (event.key !== 'Enter' ||  event.isComposing || event.target.value.trim().length === 0) {
            return;
        }
        addUser(event.target.value.trim());
        event.target.value = '';
        inputValue = '';
    };
</script>

<style>
    .input__wrapper {
        display: flex;
    }
    .btn__wrapper {
        margin-left: 16px;
    }

    .user_list {
        margin-top: 16px;
    }

    .user_list__item {
        display: flex;
        flex-wrap: wrap;
    }
    .user_list__header {
        margin-bottom: 8px;
        width: 780px;
        text-align: right;
    }

    @media screen and (max-width: 1179px) {
        .user_list__header {
            width: 95%;
        }
    }
</style>

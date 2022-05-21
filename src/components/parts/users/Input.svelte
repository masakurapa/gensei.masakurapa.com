<FormWrapper>
    <span slot="label">抽選対象（{userNameMax}文字以内）</span>

    <TextBox
        {disabled}
        value="{inputValue}"
        placeholder="Enterを押して追加"
        on:keydown={keydown}
        on:change={onChange}
        size={20}
        maxlength={userNameMax}
    />
    <div class="btn__wrapper">
        <PrimaryBtn
            size="small"
            {disabled}
            on:click="{click}"
        >追加</PrimaryBtn>
    </div>
</FormWrapper>

<script lang="ts">
    import type { InputEvent, KeyEvent } from '../../../@types/event';

    import { userList, processing, addUser } from '../../../store';

    import FormWrapper from '../forms/Wrapper.svelte';
    import TextBox from '../forms/TextBox.svelte';
    import PrimaryBtn from '../buttons/Primary.svelte';

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
        if (event.key !== 'Enter' ||  event.isComposing || event.target.value.trim().length === 0) {
            return;
        }
        addUser(event.target.value.trim());
        event.target.value = '';
        inputValue = '';
    };
</script>

<style>
    .btn__wrapper {
        margin-left: 1em;
    }
</style>

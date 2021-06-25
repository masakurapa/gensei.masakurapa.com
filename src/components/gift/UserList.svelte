<CollapseFrame id="gift-user-list-input" label="③抽選対象を設定する">
    <InputGroup label="抽選対象 <span class='bold-text'>{listSize}</span>人">
        <div><small>改行区切りで入力してください。</small></div>
        <InputTextarea
            value={inputUserList}
            on:change={onChange}
            on:input={onInput}
            {disabled}
        ></InputTextarea>

        <MainButton
            label="リセット"
            on:click={onClickReset}
            btnStyle={{
                width: '90px',
                padding: '0.25em',
                'background-color': '#ff9933',
                'font-size': 'small',
            }}
            {disabled}
        ></MainButton>
    </InputGroup>
</CollapseFrame>

<script lang="ts">
    import type { InputEvent } from '../../@types/event';
    import { processing } from '../../store';
    import { userList, blocking } from './store';

    import CollapseFrame from '../../components/common/collapse/CollapseFrame.svelte';

    import MainButton from '../../parts/button/MainButton.svelte';
    import InputGroup from '../../parts/input/InputGroup.svelte';
    import InputTextarea from '../../parts/input/InputTextarea.svelte';

    const onChange = (event: InputEvent): void => {
        const filtered = filterUserList(event.target.value);
        inputUserList = joinUserList(filtered);
        userList.set(filtered);
    };

    const onInput = (event: InputEvent): void => {
        listSize = filterUserList(event.target.value).length;
    };

    const onClickReset = (): void => {
        inputUserList = '';
        userList.set([]);
    };

    const filterUserList = (str: string): string[] => {
        return str.trim().split(/\n/).filter((val) => val.trim() !== '');
    };
    const joinUserList = (list: string[]): string => {
        return list.join('\n');
    };

    let inputUserList = joinUserList($userList);
    let listSize = 0;

    $: disabled = $processing || $blocking;
</script>

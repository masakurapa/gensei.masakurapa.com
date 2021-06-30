<InputGroup label="抽選対象 <span class='bold-text'>{listSize}</span>人">
    <div><small>改行区切りで入力してください。</small></div>
    <InputTextarea
        value={inputUserList}
        on:change={onChange}
        on:input={onInput}
    ></InputTextarea>

    <div class="btn-area">
        <MainButton
            label="入力済みの抽選対象を使う"
            on:click={onClickSetUserList}
            btnStyle={{
                width: '180px',
                padding: '0.25em',
                'font-size': 'small',
            }}
        ></MainButton>
        <MainButton
            label="リセット"
            on:click={onClickReset}
            btnStyle={{
                width: '80px',
                padding: '0.25em',
                'background-color': '#ff9933',
                'font-size': 'small',
            }}
        ></MainButton>
    </div>
</InputGroup>

<script lang="ts">
    import type { InputEvent } from '../../../@types/event';
    import { userList as appUserList } from '../../../store';
    import { userList } from '../store';
    import MainButton from '../../../parts/button/MainButton.svelte';
    import InputGroup from '../../../parts/input/InputGroup.svelte';
    import InputTextarea from '../../../parts/input/InputTextarea.svelte';

    const onChange = (event: InputEvent): void => {
        const filtered = filterUserList(event.target.value);
        inputUserList = joinUserList(filtered);
        userList.set(filterUserList(event.target.value));
    };

    const onInput = (event: InputEvent): void => {
        listSize = filterUserList(event.target.value).length;
    };

    const onClickSetUserList = (): void => {
        const names = $appUserList.map(obj => obj.name);

        inputUserList = joinUserList(names)
        listSize = names.length;
        userList.set(names);
    }

    const onClickReset = (): void => {
        inputUserList = '';
        listSize = 0;
        userList.set([]);
    }

    const filterUserList = (str: string): string[] => {
        return str.trim().split(/\n/).filter((val) => val.trim() !== '');
    }
    const joinUserList = (list: string[]): string => {
        return list.join('\n');
    }

    let inputUserList = joinUserList($userList);
    let listSize = 0;
</script>

<style>
    .btn-area {
        display: flex;
        margin-bottom: 1em;
    }
</style>

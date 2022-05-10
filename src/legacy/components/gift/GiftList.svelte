<CollapseFrame id="gift-list-input" label="②景品を設定する">
    <InputGroup label="景品 <span class='bold-text'>{listSize}</span>個">
        <div><small>改行区切りで入力してください。</small></div>
        <InputTextarea
            value={inputGitfList}
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
    import type { InputEvent } from '../../../@types/event';

    import { processing } from '../../../store.js';
    import { giftList, addCanvas, blocking } from './store.js';

    import CollapseFrame from '../../components/common/collapse/CollapseFrame.svelte';

    import MainButton from '../../parts/button/MainButton.svelte';
    import InputGroup from '../../parts/input/InputGroup.svelte';
    import InputTextarea from '../../parts/input/InputTextarea.svelte';

    const onChange = (event: InputEvent): void => {
        const filtered = filterGiftList(event.target.value);
        inputGitfList = joinGiftList(filtered);
        giftList.set(filtered);

        for (let i = 0; i < $giftList.length; i++) {
            addCanvas();
        }
    }

    const onInput = (event: InputEvent): void => {
        listSize = filterGiftList(event.target.value).length;
    }

    const onClickReset = (): void => {
        inputGitfList = '';
        giftList.set([]);
    }

    const filterGiftList = (str: string): string[] => {
        return str.trim().split(/\n/).filter((val) => val.trim() !== '');
    }
    const joinGiftList = (list: string[]): string => {
        return list.join('\n');
    }

    let listSize = 0;
    let inputGitfList = joinGiftList($giftList);

    $: disabled = $processing || $blocking;
</script>

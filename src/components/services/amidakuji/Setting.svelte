<Accordion id="random" title="設定" open>
    <FormWrapper>
        <span slot="label">あみだくじの行数</span>
        <Number
            value="{$lineNum}"
            min={LINE_NUM_MIN}
            max={LINE_NUM_MAX}
            on:change={onChangeLineNum}
        />
    </FormWrapper>
</Accordion>

<script lang="ts">
    import type { InputEvent } from '../../../@types/event';
    import type { UserList } from '../../../@types/user';

    import { userList } from '../../../store';
    import { toInt } from '../../../util';

    import {
        lineNum,
        amidakuji,
        rank,
        selectedUserList,
        disabledWriteLine,
    } from './store';
    import {
        generateAmidakuji,
        generateRandomAmidakuji,
        shuffleUserList,
    } from './util';

    import Accordion from '../../parts/accordion/Accordion.svelte';
    import FormWrapper from '../../parts/forms/Wrapper.svelte';
    import Number from '../../parts/forms/Number.svelte';

    // 線を引ける最小行数
    const LINE_NUM_MIN = 5;
    // 線を引ける最大行数
    const LINE_NUM_MAX = 50;

    // 行数変更時のイベント
    const onChangeLineNum = (event: InputEvent|any): void => {
        lineNum.set(toInt(event.detail.value));
    };

    // あみだくじの内容をリセットする
    const reset = (value: UserList): void => {
        disabledWriteLine.set(false);
        rank.set(1);
        const newAmidakuji = generateAmidakuji(value, $lineNum);
        amidakuji.set(generateRandomAmidakuji(newAmidakuji, $lineNum));
        selectedUserList.set(shuffleUserList(value));
    };

    lineNum.subscribe(() => {
        reset($userList);
    });

    userList.subscribe((value) => {
        reset(value);
    });
</script>

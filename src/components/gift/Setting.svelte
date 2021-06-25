<CollapseFrame id="gift-setting-input" label="④抽選の設定をする">
    <InputGroup label="1つの対象が重複当選できる景品数 <span class='bold-text'>{$duplicatePrizeCnt}</span>個">
        <InputRange
            value={$duplicatePrizeCnt}
            min="{minCnt}"
            max="{maxCnt}"
            on:input="{onInput}"
            {disabled}
        ></InputRange>
    </InputGroup>
</CollapseFrame>

<script lang="ts">
    import type { InputEvent } from '../../@types/event';

    import { processing } from '../../store';
    import {
        giftList,
        userList,
        duplicatePrizeCnt,
        blocking,
    } from './store';

    import CollapseFrame from '../../components/common/collapse/CollapseFrame.svelte';
    import InputGroup from '../../parts/input/InputGroup.svelte';
    import InputRange from '../../parts/input/InputRange.svelte';

    let minCnt = $duplicatePrizeCnt;
    $: maxCnt = $giftList.length;
    $: {
        const uLen = $userList.length;
        const gLen = $giftList.length;
        const cnt = gLen - uLen;

        if (uLen === 0 || cnt < 1) {
            minCnt = 1;
            duplicatePrizeCnt.set(1);
        } else {
            // 景品が抽選対象より多い場合は強制的に重複当選を許容させる
            if (cnt % uLen === 0) {
                minCnt = (cnt / uLen) + 1;
            } else {
                minCnt = (cnt / uLen) + (cnt % uLen) + 1;
            }
            duplicatePrizeCnt.set(minCnt);
        }
    }

    $: disabled = $processing || $blocking;

    const onInput = (event: InputEvent): void => {
        duplicatePrizeCnt.set(parseInt(event.target.value, 10));
    };
</script>

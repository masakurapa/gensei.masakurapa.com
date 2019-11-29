<CollapseFrame id="gift-setting-input" label="④抽選の設定をする">
    <InputGroup label="1つの対象が重複当選できる景品数 <span class='bold-text'>{$duplicatePrizeCnt}</span>個">
        <InputRange
            value={$duplicatePrizeCnt}
            min="{minCnt}"
            max="{maxCnt}"
            on:input="{(event) => { setDuplicatePrizeCnt(event.target.value) }}"
            {disabled}
        ></InputRange>
    </InputGroup>
</CollapseFrame>

<script>
    import { processing } from 'app/store.js'
    import {
        giftList,
        userList,
        duplicatePrizeCnt,
        setDuplicatePrizeCnt,
        blocking,
    } from 'components/gift/store.js'

    let minCnt = $duplicatePrizeCnt
    $: maxCnt = $giftList.length
    $: {
        const uLen = $userList.length
        const gLen = $giftList.length
        const cnt = gLen - uLen

        if (uLen === 0 || cnt < 1) {
            minCnt = 1
            setDuplicatePrizeCnt(1)
        } else {
            // 景品が抽選対象より多い場合は強制的に重複当選を許容させる
            minCnt = (cnt % uLen) + 1
            setDuplicatePrizeCnt(minCnt)
        }
    }

    import CollapseFrame from 'components/common/collapse/CollapseFrame.svelte'
    import InputGroup from 'parts/input/InputGroup.svelte'
    import InputRange from 'parts/input/InputRange.svelte'

    $: disabled = $processing || $blocking
</script>

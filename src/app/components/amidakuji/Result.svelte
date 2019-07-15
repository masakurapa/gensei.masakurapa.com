{#if $amidakuji.length > 0}
<div class="result">
    <div class="row">
        {#each $userList as user, i}
            {#if i !== 0}
                <div class="line-h line-none"></div>
            {/if}
            <div class="line-v line-none number-button-line-v">
                <div class="line-v-inner">
                    <button class="number-button" on:click="{() => run(i)}" disabled={$processing}>{numbers[i]}</button>
                </div>
            </div>
        {/each}
    </div>

    {#each $amidakuji as row, h}
        <div class="row">
            {#each row as data, v}
                {#if isHorizon(v)}
                    <!-- 横線 -->
                    {#if data.active}
                        <div class="line-h line-active">
                            {#if data.rivers}
                                <div class="line-selected-h line-selected line-selected-h-rivers" style="width: {data.size}%;"></div>
                            {:else}
                                <div class="line-selected-h line-selected" style="width: {data.size}%;"></div>
                            {/if}
                        </div>
                    {:else if data.flag === flags.none}
                        <div class="line-h line-none"></div>
                    {:else if data.flag === flags.off}
                        <div class="line-h" on:click="{() => !$disabledWriteLine && amidakuji.set(writeHrizon($amidakuji, h, v))}"></div>
                    {:else if data.flag === flags.on}
                        <div class="line-h line-active" on:click="{() => !$disabledWriteLine && amidakuji.set(writeHrizon($amidakuji, h, v))}"></div>
                    {/if}
                {:else}
                    <!-- 縦線 -->
                    {#if data.active && h === 0}
                        <div class="line-v">
                            <div class="line-selected" style="height: {data.size}%;"></div>
                        </div>
                    {:else if data.active && h !== 0}
                        <div class="line-v line-selected-v">
                            <div class="line-selected" style="height: {data.size}%;"></div>
                        </div>
                    {:else}
                        <div class="line-v"></div>
                    {/if}
                {/if}
            {/each}
        </div>
    {/each}

    <div class="row">
        {#each $selectedUserList as user, i}
            {#if i !== 0}
                <div class="line-h line-none"></div>
            {/if}
            <div class="line-v line-none result-line-v">
                <div class="line-v-inner result-text-group">
                    {#if user.rank !== 0}
                        <div>
                            <div class="result-text">{user.rank}</div>
                            <div>{user.name}</div>
                        </div>
                    {:else}
                        <div class="result-text">㋪</div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
</div>
{/if}

<script>
    import { userList, processing } from 'app/store.js'
    import { sleep } from 'app/util.js'
    import { amidakuji, selectedUserList, disabledWriteLine, rank } from 'components/amidakuji/store.js'
    import { flags, isHorizon, hideUnselectedLine, writeHrizon, clearActiveLine } from 'components/amidakuji/util.js'

    const numbers = [
        '①',
        '②',
        '③',
        '④',
        '⑤',
        '⑥',
        '⑦',
        '⑧',
        '⑨',
        '⑩',
        '⑪',
        '⑫',
        '⑬',
        '⑭',
        '⑮',
    ]

    // 抽選
    async function run (num) {
        processing.set(true)
        disabledWriteLine.set(true)
        // 抽選前に線を初期化する
        amidakuji.set(clearActiveLine($amidakuji))
        amidakuji.set(hideUnselectedLine($amidakuji))

        await sleep(500)

        let horizon = 0
        let vertical = num * 2
        let oldVertical = vertical

        while ($amidakuji[horizon] !== undefined) {
            const point = $amidakuji[horizon][vertical].flag
            $amidakuji[horizon][vertical].active = true

            // 現在地が横線
            // 横線続きはないので下に降りる
            if (isHorizon(vertical) && point === flags.on) {
                $amidakuji[horizon][vertical].rivers = oldVertical > vertical
                await progress(horizon, vertical)

                horizon++

                // 前の縦線が今の縦線より大きい → 左に移動した
                // 前の縦線が今の縦線より小さい → 右に移動した
                vertical += oldVertical > vertical ? -1 : 1
                continue
            }

            // 現在地が縦線
            await progress(horizon, vertical)

            // 左右どちらかに行ければ横にずれる
            const rowl = $amidakuji[horizon][vertical - 1]
            if (rowl !== undefined && rowl.flag === flags.on) {
                oldVertical = vertical
                vertical -= 1
                continue
            }
            const rowr = $amidakuji[horizon][vertical + 1]
            if (rowr !== undefined && rowr.flag === flags.on) {
                oldVertical = vertical
                vertical += 1
                continue
            }
            // 無ければ下に降りる
            horizon++
        }

        await sleep(1000)

        const index = vertical / 2
        if ($selectedUserList[index].rank === 0) {
            $selectedUserList[index].rank = $rank
            rank.update(val => ++val)
        }

        processing.set(false)
    }

    // background-colorの移動
    async function progress (h, v) {
        for (let i = 1; i <= 10; i++) {
            $amidakuji[h][v].size = i * 10
            await sleep(15)
        }
    }
</script>

<style>
    /* 結果 */
    .result {
        margin: auto;
        margin-top: 1em;
        margin-bottom: 2.5em;
        padding: 1em 1.5em 1em 1.5em;
        width: 80%;
        background-color: #FFFFFF;
        border: 0.1em solid #668ad8 !important;
        border-radius: 2em;
        height: auto;
    }
    .row {
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }

    .line-v {
        background-color: #666;
        width: 0.25em;
        height: 3em;
    }
    .line-selected-v {
        height: 3.5em;
        margin-top: -0.5em;
    }
    .line-h {
        background-color: #eee;
        width: 4em;
        height: 0.5em;
    }
    .line-selected-h {
        height: 0.5em;
    }
    .line-selected-h-rivers {
        float: right;
    }
    .line-active {
        background-color: #666;
    }
    .line-selected {
        background-color: crimson;
    }
    .line-none {
        background-color: #FFF;
    }

    .number-button-line-v {
        height: auto;
        min-height: 4em;
    }
    .result-line-v {
        height: auto;
        min-height: 3em;
    }
    .line-v-inner {
        text-align: center;
        width: 1.25em;
        margin-left: -7px;
    }
    .result-text-group {
        word-break: break-all;
        vertical-align: top;
    }
    .result-text {
        font-family: inherit;
        font-size: inherit;
        color: rgb(170,30,30);
    }

    .number-button {
        padding: 0;
        cursor: pointer;
        width: 1.25em;
        background-color: #1976d2 !important;
        border: 0.05em solid #FFF;
        border-radius: 0.25em;
        text-align: center;
        line-height: 2.5em;
        color: #FFF;
        font-family: inherit;
        font-size: inherit;
    }
    .number-button:disabled {
        background-color: #eee !important;
        cursor: unset;
    }
</style>

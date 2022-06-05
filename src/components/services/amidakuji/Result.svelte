{#if $amidakuji.length > 0}
<div class="row header">
    {#each $selectedUserList as user, i}
        <div class="header__item">
            <div class="header__select_order">
                {user.order !== 0 ? user.order : ''}
            </div>
            <div class="header__btn">
                <PrimaryBtn
                    size="x-small"
                    on:click="{() => run(i)}"
                    disabled={$processing || user.order !== 0}
                >{i + 1}</PrimaryBtn>
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
                {:else if data.flag === Flag.NONE}
                    <div class="line-h line-none"></div>
                {:else if data.flag === Flag.OFF}
                    <div class="line-h" on:click="{() => !$disabledWriteLine && amidakuji.set(writeHrizon($amidakuji, h, v))}"></div>
                {:else if data.flag === Flag.ON}
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

<div class="row footer">
    {#each $selectedUserList as user, i}
        <div class="footer__item">
            <div class="footer__rank">
                {user.position !== 0 ? user.position : ''}
            </div>
            <div class="footer__user">
                <ChipVertical size="midium">{user.rank !== 0 ? user.name : ''}</ChipVertical>
            </div>
        </div>
    {/each}
</div>
{/if}

<script lang="ts">
    import { Flag } from '../../../@types/amidakuji';
    import { processing } from '../../../store';
    import { sleep } from '../../../util';

    import { amidakuji, selectedUserList, disabledWriteLine, rank } from './store';
    import { isHorizon, hideUnselectedLine, writeHrizon, clearActiveLine } from './util';

    import PrimaryBtn from '../../parts/buttons/Primary.svelte';
    import ChipVertical from '../../parts/chip/ChipVertical.svelte';


    // 抽選
    const run = async (num: number): Promise<void> => {
        processing.set(true);
        disabledWriteLine.set(true);
        // 抽選前に線を初期化する
        amidakuji.set(clearActiveLine($amidakuji));
        amidakuji.set(hideUnselectedLine($amidakuji));

        // 選択された順番
        $selectedUserList[num].order = $rank;

        await sleep(500);

        let horizon = 0;
        let vertical = num * 2;
        let oldVertical = vertical;

        while ($amidakuji[horizon] !== undefined) {
            const point = $amidakuji[horizon][vertical].flag;
            $amidakuji[horizon][vertical].active = true;

            // 現在地が横線
            // 横線続きはないので下に降りる
            if (isHorizon(vertical) && point === Flag.ON) {
                $amidakuji[horizon][vertical].rivers = oldVertical > vertical;
                await progress(horizon, vertical);

                horizon++;

                // 前の縦線が今の縦線より大きい → 左に移動した
                // 前の縦線が今の縦線より小さい → 右に移動した
                vertical += oldVertical > vertical ? -1 : 1;
                continue;
            }

            // 現在地が縦線
            await progress(horizon, vertical);

            // 左右どちらかに行ければ横にずれる
            const rowl = $amidakuji[horizon][vertical - 1];
            if (rowl !== undefined && rowl.flag === Flag.ON) {
                oldVertical = vertical;
                vertical -= 1;
                continue;
            }
            const rowr = $amidakuji[horizon][vertical + 1];
            if (rowr !== undefined && rowr.flag === Flag.ON) {
                oldVertical = vertical;
                vertical += 1;
                continue;
            }
            // 無ければ下に降りる
            horizon++;
        }

        await sleep(1000);

        const index = vertical / 2;
        if ($selectedUserList[index].rank === 0) {
            $selectedUserList[index].rank = $rank;
            $selectedUserList[index].position = num + 1;
            rank.update(val => ++val);
        }

        processing.set(false);
    }

    // background-colorの移動
    const progress = async (h: number, v: number): Promise<void> => {
        for (let i = 1; i <= 10; i++) {
            $amidakuji[h][v].size = i * 10;
            await sleep(15);
        }
    };
</script>

<style>
    /* 各列に共通使用するスタイル */
    .row {
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
        align-items: flex-end;
    }

    /* ヘッダー（数字ボタンエリア） */
    .header {
        margin-bottom: 20px;
        align-items: flex-end;
    }
    .header__item {
        width: 100px;
    }
    .header__select_order {
        height: 24px;
        text-align: center;
    }
    .header__btn {
        text-align: center;
    }

    /* メイン（あみだくじ） */


    /* フッター（結果エリア） */
    .footer {
        margin-top: 20px;
        align-items: flex-start;
    }
    .footer__item {
        width: 100px;
    }
    .footer__rank {
        height: 40px;
        line-height: 40px;
        width: 30px;
        font-family: inherit;
        font-size: inherit;
        padding: 0;
        box-sizing: border-box;
        border: 0.05em solid #ccc;
        border-radius: 0.25em;
        background-color: #1976d2;
        color: #FFFFFF;
        outline: none;
        text-align: center;
        margin: 0 auto;
    }
    .footer__user {
        display: flex;
        justify-content: center;
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

    .result-text {
        font-family: inherit;
        font-size: inherit;
        color: rgb(170,30,30);
    }
    .result-name-text {
        margin-bottom: 10px;
    }
</style>

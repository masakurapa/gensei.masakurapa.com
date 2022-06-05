{#if $amidakuji.length > 0}
<div class="row header">
    {#each $selectedUserList as user, i}
        <div class="row__fixed_item">
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
    <div class="row content">
        {#each row as data, v}
            {#if isHorizon(v)}
                <!-- 横線 -->
                {#if data.active}
                    <div class="line_horizon line_horizon_active">
                        <div
                            class="line__horizon_pass line__passed"
                            class:line__horizon_rivers={data.rivers}
                            style="width: {data.size}%;"
                        ></div>
                    </div>
                {:else if data.flag === Flag.NONE}
                    <div class="line_horizon line_horizon_none"></div>
                {:else if data.flag === Flag.OFF}
                    <div class="line_horizon" on:click="{() => !$disabledWriteLine && amidakuji.set(writeHrizon($amidakuji, h, v))}"></div>
                {:else if data.flag === Flag.ON}
                    <div class="line_horizon line_horizon_active" on:click="{() => !$disabledWriteLine && amidakuji.set(writeHrizon($amidakuji, h, v))}"></div>
                {/if}
            {:else}
                <!-- 縦線 -->
                {#if data.active}
                    <div
                        class="line_vertical"
                        class:line__vertical_pass={h !== 0}
                    >
                        <div class="line__passed" style="height: {data.size}%;"></div>
                    </div>
                {:else}
                    <div class="line_vertical"></div>
                {/if}
            {/if}
        {/each}
    </div>
{/each}

<div class="row footer">
    {#each $selectedUserList as user, i}
        <div class="row__fixed_item">
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

    import {
        amidakuji,
        selectedUserList,
        disabledWriteLine,
        lineNum,
        rank,
    } from './store';
    import {
        isHorizon,
        hideUnselectedLine,
        writeHrizon,
        clearActiveLine,
    } from './util';

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
            const num = $lineNum;
            if (num >= 20) {
                await sleep(4);
            } else if (num >= 10) {
                await sleep(8);
            } else {
                await sleep(12);
            }
        }
    };
</script>

<style>
    /*
     * 共通使用するスタイル
     */
    /* 各行 */
    .row {
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
    }
    /* header/footerの幅固定 */
    .row__fixed_item {
        width: 80px;
        flex-shrink: 0;
    }

    /*
     * ヘッダー（数字ボタンエリア）
     */
    .header {
        margin-bottom: 20px;
        align-items: flex-end;
    }
    .header__select_order {
        height: 24px;
        text-align: center;
    }
    .header__btn {
        text-align: center;
    }

    /*
     *メイン（あみだくじ）
     */
    .content {
        align-items: flex-end;
        margin-left: 36px;
    }
    /* 通過した線 */
    .line__passed {
        background-color: crimson;
    }

    /* 縦線のベース */
    .line_vertical {
        background-color: #666;
        width: 0.5em;
        height: 3em;
        flex-shrink: 0;
    }
    /* 縦線（通過時の要素の高さを調整するためのスタイル） */
    .line__vertical_pass {
        height: 3.5em;
        margin-top: -0.5em; /* 横線と縦線を重ねたいため、ネガティブマージンを入れている */
    }

    /* 横線のベース（線が引かれていない状態） */
    .line_horizon {
        background-color: #eee;
        width: 4.5em;
        height: 0.5em;
        cursor: pointer;
        flex-shrink: 0;
    }
    /* 横線（線が引かれている状態） */
    .line_horizon_active {
        background-color: #666;
        cursor: pointer;
    }
    /* 横線（隣接する横線に線が引かれていて、線が引けない状態） */
    .line_horizon_none {
        visibility: hidden;
        cursor: unset;
    }
    /* 横線（通過時の要素の高さを確保するためのスタイル） */
    .line__horizon_pass {
        height: 0.5em;
    }
    /* 横線（右から左に線を動かすためのスタイル） */
    .line__horizon_rivers {
        float: right;
    }

    /*
     * フッター（結果エリア）
     */
    .footer {
        margin-top: 20px;
        align-items: flex-start;
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
</style>

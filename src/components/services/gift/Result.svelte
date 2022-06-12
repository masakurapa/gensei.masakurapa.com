{#if $giftList.length > 0}
    {#each $canvases as obj, index (obj.no)}
        <div class="result">
            {#if index <= $giftList.length - 1}
                <Chip size="large">{$giftList[index]}</Chip>
                <div>
                    <PrimaryBtn
                        size="40_200"
                        disabled="{disabledBtn || $finishedGiftIndex.indexOf(index) !== -1}"
                        on:click="{() => start(index)}"
                    >抽選!!</PrimaryBtn>
                </div>
                <div class="result__canvas">
                    <canvas
                        width="100"
                        height="88"
                        bind:this="{$canvases[index].canvas}"
                    ></canvas>
                </div>
            {/if}
        </div>
    {/each}
{/if}

<script lang="ts">
    import type { Canvas } from '../../../@types/canvas';

    import { processing } from '../../../store';
    import { random } from '../../../util';
    import {
        giftList,
        userList,
        canvases,
        duplicatePrizeCnt,
        blocking,
        winPrizeCount,
        finishedGiftIndex,
    } from './store';

    import PrimaryBtn from '../../parts/buttons/Primary.svelte';
    import Chip from '../../parts/chip/Chip.svelte';

    const scale = 40;
    const breaks = 0.003;
    const endSpeed = 0.05;
    const firstLetter = 220;
    const delay = 20;

    $: disabledBtn = $processing || $userList.length === 0;
    $: userLength = $userList.length;

    let frameId = 0;

    const start = async (no: number): Promise<void> => {
        if (frameId > 0) {
            cancelAnimationFrame(frameId);
        }

        processing.set(true);
        blocking.set(true);
        selectEndpoint(no);

        // 抽選済みの景品をマーク
        finishedGiftIndex.update(value => {
            value.push(no)
            return value;
        })

        const obj = $canvases[no];
        obj.ctx = obj.canvas.getContext('2d');

        const f = firstLetter + delay * (obj.no - 1);

        obj.offsetV = (endSpeed + breaks * f);
        obj.offset = -(1 + f) * (breaks * f + 2 * endSpeed) / 2;
        obj.canvas.width = obj.canvas.clientWidth;
        obj.canvas.height = obj.canvas.clientHeight;

        requestAnimationFrame(() => run(obj));
    }

    // 当り位置を決める
    const selectEndpoint = (no: number): void => {
        const indexes: number[] = [];
        for (const key in $userList) {
            const n = Number(key);
            const selected = $winPrizeCount[n];
            if (selected === undefined || selected < $duplicatePrizeCnt) {
                indexes.push(n);
            }
        }

        const idx = indexes[random(indexes.length)];
        const selected = $winPrizeCount[idx];
        $canvases[no].end = idx;
        $winPrizeCount[idx] = selected === undefined ? 1 : selected + 1;
    }

    const run = (obj: Canvas): void => {
        // 変換マトリクスを作る
        obj.ctx.setTransform(1, 0, 0, 1, 0, 0);
        // canvasをクリア
        obj.ctx.clearRect(0, 0, obj.canvas.width, obj.canvas.height);

        // スタイル設定（ぐるぐるするエリアの背景塗りつぶす）
        obj.ctx.globalAlpha = 1;
        obj.ctx.fillStyle = '#e9eefa';
        // 背景がボーダーにかぶるので横幅を左+5、右-10してる
        // 高さも微妙にずれるので5プラスしている
        obj.ctx.fillRect(5, (obj.canvas.height - scale + 5) / 2, obj.canvas.width - 10, scale);

        // 文字の色・フォントとか
        obj.ctx.fillStyle = '#000';
        obj.ctx.textBaseline = 'middle';
        obj.ctx.textAlign = 'center';

        // 変換マトリクスを作る
        obj.ctx.setTransform(1, 0, 0, 1, Math.floor(obj.canvas.width / 2), Math.floor(obj.canvas.height / 2))

        let o = obj.offset;
        while (o < 0) o++;
        o %= 1;

        const h = Math.ceil(obj.canvas.height / 2 / scale);
        for (let j = -h; j < h; j++) {
            let c = obj.end + j - Math.floor(obj.offset);
            while (c < 0) c += userLength;
            c %= userLength;

            const s = 1 - Math.abs(j + o) / (obj.canvas.height / 2 / scale + 1);
            obj.ctx.globalAlpha = s;
            obj.ctx.font = scale * s + 'px Helvetica';

            // テキストを描画する
            obj.ctx.fillText($userList[c], 0, (j + o) * scale);
        }

        obj.offset += obj.offsetV;
        obj.offsetV -= breaks;
        if (obj.offsetV < endSpeed) {
            obj.offset = 0;
            obj.offsetV = 0;
            cancelAnimationFrame(frameId);
            processing.set(false);
            return;
        }

        frameId = requestAnimationFrame(() => run(obj));
    }
</script>

<style>
    .result {
        display: flex;
        width: 900px;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
    }

    .result__canvas {
        height: 88px;
    }
    canvas {
        background-color: #e9eefa;
        height: 88px;
        width: 300px;
        left: 0;
        top: 0;
        border-radius: 3em;
        border: 0.1em solid #668ad8;
    }
</style>

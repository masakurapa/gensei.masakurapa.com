<MainButton label="抽選終了" disabled="{disabledFinishBtn}" on:click="{() => finish()}"/>

{#if $giftList.length > 0}
    <div class="result">
        {#each $canvases as obj, index (obj.no)}
            {#if index <= $giftList.length - 1}
                <div class="table-wrapper">
                    <div class="table-cell-gift-name">{$giftList[index]}</div>
                    <div class="table-cell-start-btn">
                        <MainButton
                            label="抽選!!"
                            on:click="{() => start(index)}"
                            disabled="{disabledBtn || finished.indexOf(index) !== -1}"
                        />
                    </div>
                    <div class="table-cell-canvas">
                        <canvas
                            width="100"
                            height="100"
                            bind:this="{$canvases[index].canvas}"
                        ></canvas>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
{/if}

<script>
    import { processing } from 'app/store.js'
    import { random } from 'app/util.js'
    import { giftList, userList, canvases, duplicatePrizeCnt, blocking } from 'components/gift/store.js'

    import MainButton from 'parts/button/MainButton.svelte'

    const scale = 40
    const breaks = 0.003
    const endSpeed = 0.05
    const firstLetter = 220
    const delay = 40

    $: disabledBtn = $processing || $userList.length === 0
    $: disabledFinishBtn = $processing || !$blocking
    $: userLength = $userList.length

    let selected = []
    let finished = []
    let frameId = 0

    function finish () {
        blocking.set(false)
        selected = []
        finished = []
    }

    async function start (no) {
        if (frameId > 0) {
            cancelAnimationFrame(frameId)
        }

        processing.set(true)
        blocking.set(true)
        selectEndpoint(no)
        finished.push(no)

        const obj = $canvases[no]
        obj.ctx = obj.canvas.getContext('2d')

        const f = firstLetter + delay * (obj.no - 1)

        obj.offsetV = (endSpeed + breaks * f)
        obj.offset = -(1 + f) * (breaks * f + 2 * endSpeed) / 2
        obj.canvas.width = obj.canvas.clientWidth
        obj.canvas.height = obj.canvas.clientHeight

        requestAnimationFrame(() => slot(obj))
    }

    // 当り位置を決める
    function selectEndpoint (no) {
        const indexes = []
        for (const key in $userList) {
            const n = Number(key)
            if (selected[n] === undefined || selected[n] < $duplicatePrizeCnt) {
                indexes.push(n)
            }
        }

        const idx = indexes[random(indexes.length)]
        $canvases[no].end = idx
        selected[idx] = selected[idx] === undefined ? 1 : selected[idx] + 1
    }

    function slot (obj) {
        // 変換マトリクスを作る
        obj.ctx.setTransform(1, 0, 0, 1, 0, 0)
        // canvasをクリア
        obj.ctx.clearRect(0, 0, obj.canvas.width, obj.canvas.height)

        // スタイル設定（ぐるぐるするエリアの背景塗りつぶす）
        obj.ctx.globalAlpha = 1
        obj.ctx.fillStyle = '#e9eefa'
        // 背景がボーダーにかぶるので横幅を左+5、右-10してる
        // 高さも微妙にずれるので5プラスしている
        obj.ctx.fillRect(5, (obj.canvas.height - scale + 5) / 2, obj.canvas.width - 10, scale)

        // 文字の色・フォントとか
        obj.ctx.fillStyle = '#000'
        obj.ctx.textBaseline = 'middle'
        obj.ctx.textAlign = 'center'

        // 変換マトリクスを作る
        obj.ctx.setTransform(1, 0, 0, 1, Math.floor(obj.canvas.width / 2), Math.floor(obj.canvas.height / 2))

        let o = obj.offset
        while (o < 0) o++
        o %= 1

        const h = Math.ceil(obj.canvas.height / 2 / scale)
        for (let j = -h; j < h; j++) {
            let c = obj.end + j - Math.floor(obj.offset)
            while (c < 0) c += userLength
            c %= userLength

            const s = 1 - Math.abs(j + o) / (obj.canvas.height / 2 / scale + 1)
            obj.ctx.globalAlpha = s
            obj.ctx.font = scale * s + 'px Helvetica'

            // テキストを描画する
            obj.ctx.fillText($userList[c], 0, (j + o) * scale)
        }

        obj.offset += obj.offsetV
        obj.offsetV -= breaks
        if (obj.offsetV < endSpeed) {
            obj.offset = 0
            obj.offsetV = 0
            cancelAnimationFrame(frameId)
            processing.set(false)
            return
        }

        frameId = requestAnimationFrame(() => slot(obj))
    }
</script>

<style>
    .result {
        margin: auto;
        margin-top: 1em;
        margin-bottom: 2.5em;
        padding: 1em 2em 1em 2em;
        width: 60%;
        background-color: #FFFFFF;
        border: 0.1em solid #668ad8 !important;
        border-radius: 2em;
        height: auto;
    }

    canvas {
        background-color: #e9eefa;
        height: 100px;
        width: 300px;
        left: 0;
        top: 0;
        margin: 10px;
        border-radius: 3em;
        border: 0.1em solid #668ad8;
    }

    .table-wrapper {
        display: table;
        margin: auto;
        widows: 100%;
    }
    .table-cell-gift-name {
        display: table-cell;
        vertical-align: middle;
        font-weight: bold;
        width: 30%;
        word-break: break-all;
    }
    .table-cell-start-btn {
        display: table-cell;
        vertical-align: middle;
        width: 160px;
    }
    .table-cell-canvas {
        display: table-cell;
        vertical-align: middle;

    }
</style>

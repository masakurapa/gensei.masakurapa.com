<MainButton label="スタート!!" labelProcessing="スタート!!" {disabled} on:click="{() => start()}"/>

<script>
    import { userList, processing } from 'app/store.js'
    import { choiceNum, canvases } from 'components/slot/store.js'
    import { sleep, random } from 'app/util.js'

    import MainButton from 'parts/button/MainButton.svelte'

    $: userLength = $userList.length
    // 抽選人数の最大数を返却
    $: maxChoiceNum = userLength > 0 ? userLength : 1
    // ボタン無効判定
    $: disabled = $userList.length === 0 || $processing

    const scale = 50
    const breaks = 0.003
    const endSpeed = 0.05
    const firstLetter = 220
    const delay = 40

    async function start (no) {
        processing.set(true)
        selectEndpoint()

        for (let i = 0; i < $choiceNum; i++) {
            const obj = $canvases[i]
            obj.ctx = obj.canvas.getContext('2d')

            const f = firstLetter + delay * (obj.no - 1)

            obj.offsetV = (endSpeed + breaks * f)
            obj.offset = -(1 + f) * (breaks * f + 2 * endSpeed) / 2
            obj.canvas.width = obj.canvas.clientWidth
            obj.canvas.height = obj.canvas.clientHeight

            requestAnimationFrame(() => slot(obj))
            await sleep(50)
        }
    }

    // 当り位置を決める
    function selectEndpoint () {
        const selected = []
        while (selected.length < $choiceNum) {
            const no = random(userLength)
            if (selected.indexOf(no) !== -1) {
                continue
            }
            $canvases[selected.length].end = no
            selected.push(no)
        }
    }

    function slot (obj) {
        // 変換マトリクスを作る
        obj.ctx.setTransform(1, 0, 0, 1, 0, 0)
        // canvasをクリア
        obj.ctx.clearRect(0, 0, obj.canvas.width, obj.canvas.height)

        // スタイル設定（ぐるぐるするエリアの背景塗りつぶす）
        obj.ctx.globalAlpha = 1
        obj.ctx.fillStyle = '#c1d1f3'
        obj.ctx.fillRect(0, (obj.canvas.height - scale) / 2, obj.canvas.width, scale)

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
            obj.ctx.fillText($userList[c].name, 0, (j + o) * scale)
        }

        obj.offset += obj.offsetV
        obj.offsetV -= breaks
        if (obj.offsetV < endSpeed) {
            obj.offset = 0
            obj.offsetV = 0

            cancelAnimationFrame(obj.frameId)
            if ($choiceNum === obj.no) {
                processing.set(false)
            }
            return
        }

        obj.frameId = requestAnimationFrame(() => slot(obj))
    }
</script>

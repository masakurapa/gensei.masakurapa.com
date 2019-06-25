<BaseForm>
    <div class="input-group">
        <label>横線を引ける行数 <span class="bold">{lineNum}</span>/25</label>
        <input
            type=range
            bind:value={lineNum}
            min="1"
            max="25"
            step="1"
            on:change="{resetAmidakuji}"
            disabled={$processing}
        >
    </div>
</BaseForm>
<UserList/>

<MainButton disabled={disabledWriteLine} label="ランダムに線を引く" labelProcessing="ランダムに線を引く" on:click="{generateRandomAmidakuji}"/>

<MainButton disabled={!disabledWriteLine} label="やりなおす" labelProcessing="やりなおす" on:click="{resetAmidakuji}"/>

{#if amidakuji.length > 0}
<div class="result">
    <div class="row">
        {#each storeUserList as user, i}
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

    {#each amidakuji as row, h}
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
                        <div class="line-h" on:click="{() => !disabledWriteLine && writeHrizon(h, v)}"></div>
                    {:else if data.flag === flags.on}
                        <div class="line-h line-active" on:click="{() => !disabledWriteLine && writeHrizon(h, v)}"></div>
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
        {#each selectedUserList as user, i}
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
    import { userList, processing } from '../store.js'
    import { sleep, random, randomOdd } from '../util.js'

    import BaseForm from './parts/BaseForm.svelte'
    import UserList from './parts/UserList.svelte'
    import MainButton from './parts/MainButton.svelte'

    // 線引くのに使うフラグ
    const flags = {
        off: 0,
        on: 1,
        none: 2,
    }
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

    // あみだくじの内容
    let amidakuji = []
    // 横線を引ける行数
    let lineNum = 5
    // 縦に引く線の数
    let vertical = 0
    // 選ばれた順番
    let rank = 1
    // リセットするまで線を引き直させないためのフラグ
    let disabledWriteLine = false

    // ユーザーリスト
    let storeUserList = []
    let selectedUserList = []
    userList.subscribe(value => {
        storeUserList = value
        vertical = value.length
        resetAmidakuji()
    })

    // 横線か判定する（偶数列: 縦線, 奇数列: 横線）
    function isHorizon (i) {
        return i % 2 === 1
    }

    // あみだくじを作るためのオブジェクト
    function getRowObject (flag) {
        return {
            flag, // 線の種別
            size: 0, // background-colorのwidth/heightの割合
            active: false, // 通った道
            rivers: false, // 右から左に線を移動するためのフラグ
        }
    }

    // あみだくじを作る
    function generateAmidakuji () {
        amidakuji = []
        if (vertical === 0) {
            return
        }

        const vn = vertical + (vertical - 1)

        // 一番下に余白用の行を付けたいので横線を引く行数 + 1回処理する
        for (let h = 0; h < lineNum + 1; h++) {
            amidakuji[h] = []
            for (let v = 0; v < vn; v++) {
                let horizonFlag = h === lineNum ? flags.none : flags.off
                amidakuji[h][v] = getRowObject(isHorizon(v) ? horizonFlag : flags.on)
            }
        }
    }

    // あみだくじの内容をリセットする
    function resetAmidakuji () {
        disabledWriteLine = false
        generateAmidakuji()
        generateRandomAmidakuji()
        shuffleUserList()
    }

    // ランダムで横線を引く
    function generateRandomAmidakuji () {
        // 横線を全部初期化する
        // 一番下はマージンなので無視
        for (let h = 0; h < amidakuji.length - 1; h++) {
            for (let v = 1; v < amidakuji[h].length; v += 2) {
                amidakuji[h][v].flag = flags.off
            }
        }
        clearActiveLine()

        const vn = vertical - 1
        let num = Math.ceil((lineNum * vn) / 4)
        while (num > 0) {
            const h = random(lineNum)
            const v = randomOdd(amidakuji[0].length - 1)
            if (amidakuji[h][v].flag !== flags.off) {
                continue
            }
            writeHrizon(h, v)
            num--
        }
    }

    // ユーザー情報をシャッフルして並び替えておく
    function shuffleUserList () {
        selectedUserList = storeUserList.map((item) => {
            return {
                name: item.name, // 表示名
                rank: 0, // 何番目に選ばれたか
            }
        })
        // インクリメント用の値を初期化しとく
        rank = 1

        // あとあと計算が楽なので使わないけど横線分のデータも入れておく
        for (var i = selectedUserList.length - 1; i > 0; i--) {
            var r = random(i + 1)
            var tmp = selectedUserList[i]
            selectedUserList[i] = selectedUserList[r]
            selectedUserList[r] = tmp
        }
    }

    // アクティブな線を元に戻す
    function clearActiveLine () {
        for (let h = 0; h < amidakuji.length; h++) {
            for (let v = 0; v < amidakuji[h].length; v++) {
                if (amidakuji[h][v].active) {
                    amidakuji[h][v] = getRowObject(flags.on)
                }
            }
        }
    }

    // 未選択の線を非表示にする
    function hideUnselectedLine () {
        for (let h = 0; h < amidakuji.length; h++) {
            for (let v = 0; v < amidakuji[h].length; v++) {
                if (amidakuji[h][v].flag === flags.off) {
                    amidakuji[h][v] = getRowObject(flags.none)
                }
            }
        }
    }

    // 指定位置に線を引く
    function writeHrizon (h, v) {
        const writeSideLine = (h, v, pos, enabled) => {
            const pos1 = v + pos
            // 指定の場所に線がなければ無視
            if (amidakuji[h][pos1] === undefined) {
                return
            }

            // 線を消す時は既に入っている値は気にしない
            if (!enabled) {
                amidakuji[h][pos1].flag = flags.none
                return
            }

            // 線を表示する時は、更に隣に線が引かれてないときだけ
            const row2 = amidakuji[h][pos1 + pos]
            if (row2 === undefined || row2.flag !== flags.on) {
                amidakuji[h][pos1].flag = flags.off
            }
        }

        const val = amidakuji[h][v].flag === flags.on ? flags.off : flags.on
        amidakuji[h][v].flag = val
        // 左側
        writeSideLine(h, v, -2, val === flags.off)
        // 右側
        writeSideLine(h, v, 2, val === flags.off)
    }

    // 抽選
    async function run (num) {
        processing.set(true)
        disabledWriteLine = true
        // 抽選前に線を初期化する
        clearActiveLine()
        hideUnselectedLine()

        await sleep(500)

        let horizon = 0
        let vertical = num * 2
        let oldVertical = vertical

        while (amidakuji[horizon] !== undefined) {
            const point = amidakuji[horizon][vertical].flag
            amidakuji[horizon][vertical].active = true

            // 現在地が横線
            // 横線続きはないので下に降りる
            if (isHorizon(vertical) && point === flags.on) {
                amidakuji[horizon][vertical].rivers = oldVertical > vertical
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
            const rowl = amidakuji[horizon][vertical - 1]
            if (rowl !== undefined && rowl.flag === flags.on) {
                oldVertical = vertical
                vertical -= 1
                continue
            }
            const rowr = amidakuji[horizon][vertical + 1]
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
        if (selectedUserList[index].rank === 0) {
            selectedUserList[index].rank = rank++
        }

        processing.set(false)
    }

    // background-colorの移動
    async function progress (h, v) {
        for (let i = 1; i <= 10; i++) {
            amidakuji[h][v].size = i * 10
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

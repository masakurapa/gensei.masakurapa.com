<BaseForm>
    <div class="input-group">
        <label>抽選の厳正感 <span class="bold-text">{trialCount / trialCountStep}</span> %</label>
        <input
            disabled={$processing}
            type=range
            bind:value={trialCount}
            min="{trialCountStep}"
            max="{trialCountStep * 100}"
            step="{trialCountStep}"
        >
    </div>
    <div class="input-group">
        <label>抽選対象から <span class="bold-text">{choiceNum}個</span> 抽選する</label>
        <input
            disabled={$processing}
            type=range
            bind:value={choiceNum}
            min="1"
            max="{maxChoiceNum}"
            step="1"
        >
    </div>
</BaseForm>

<MainButton on:click="{run}"/>

<div class="result">
    <div class="left">
        <h2>抽選対象</h2>

        {#each targetUserList as item (item.id)}
            <label
                in:receive={{ key: item.id }}
                out:send={{ key: item.id }}
                animate:flip
            >
                <input disabled bind:value={item.name}>
                <button disabled={$processing} on:click="{() => removeUser(item.id)}">x</button>
            </label>
        {/each}
    </div>

    <div class="right">
        <h2>抽選結果</h2>

        {#each resultUserList as item (item.id)}
            <label
                in:receive={{ key: item.id }}
                out:send={{ key: item.id }}
                animate:flip
            >
                {item.rank}
                <input disabled bind:value={item.name}>
                <button disabled={$processing} on:click="{() => removeUser(item.id)}">x</button>
            </label>
        {/each}
    </div>
</div>

<script>
    import {
        userList,
        processing,
        removeUser,
    } from '../store.js'
    import {
        random,
        sleep,
    } from '../util.js'
    import BaseForm from './parts/BaseForm.svelte'
    import MainButton from './parts/MainButton.svelte'
    import { quintOut } from 'svelte/easing'
    import { crossfade } from 'svelte/transition'
    import { flip } from 'svelte/animate'

    // 厳選度
    const trialCountStep = 10000

    // 試行回数
    let trialCount = 10000
    // 抽選人数
    let choiceNum = 1
    // ユーザーリスト
    let storeUserList = []
    // 抽選に使う作業用のユーザーリスト
    let tempUserList = []

    userList.subscribe(value => {
        storeUserList = value
        createTempUserList()

        if (value.length === 0) {
            choiceNum = 1
            return
        }
        choiceNum = choiceNum > value.length ? value.length : choiceNum
    })

    // 抽選人数の最大数を返却
    $: maxChoiceNum = tempUserList.length > 0 ? tempUserList.length : 1
    // 抽選対象用のユーザーリスト
    $: targetUserList = tempUserList.filter(item => item.rank === 0)
    // 抽選結果用のユーザーリスト
    $: resultUserList = tempUserList.filter(item => item.rank !== 0).sort((a, b) => a.rank > b.rank ? 1 : -1)

    // 抽選処理
    async function run () {
        processing.set(true)
        createTempUserList()
        await sleep(1000)

        let rank = 1
        while (tempUserList.filter(item => item.count >= trialCount).length < choiceNum) {
            const i = random(tempUserList.length)
            tempUserList[i].count += 1
            if (tempUserList[i].count === trialCount) {
                await sleep(500)
                tempUserList[i].rank = rank++
            }
        }

        await sleep(1000)
        processing.set(false)
    }

    // 抽選用のユーザー情報を作る
    function createTempUserList () {
        tempUserList = storeUserList.map(item => {
            return {
                id: item.id,
                name: item.name,
                count: 0,
                rank: 0,
            }
        })
    }

    // アニメーションの設定
    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 200),
        fallback (node, params) {
            const style = getComputedStyle(node)
            const transform = style.transform === 'none' ? '' : style.transform

            return {
                duration: 400,
                easing: quintOut,
                css: t => `
                    transform: ${transform} scale(${t})
                    opacity: ${t}
                `,
            }
        },
    })
</script>

<style>
    /* 抽選結果 */
    .result {
        width: 90%;
        margin: 0 auto;
        margin-top: 1em;
        text-align: center;
        display: flexbox;
    }
    .result .left,
    .result .right {
        display:inline-block;
        vertical-align: top;
        padding: 1em;
        width: 100%;
        max-width: 400px;
        height: auto;
        min-height: 8em;
        background-color: #FFFFFF;
        border: 0.1em solid #668ad8 !important;
        border-radius: 2em;
        box-sizing: border-box;
        margin: 0 0 2em 0;
    }
    .result label {
        top: 0;
        left: 0;
        display: block;
        font-size: 1em;
        line-height: 1;
        padding: 0.5em;
        margin: auto;
        margin-top: 0.5em;
        border-radius: 0.5em;
        background-color: #eee;
        user-select: none;
        width: 80%;
        display: block;
    }
    .result input {
        height: 2em;
        width: 80%;
        font-family: inherit;
        font-size: inherit;
        padding: 0.4em;
        margin: 0;
        box-sizing: border-box;
        border: 0;
        background-color: #eee;
    }
    .result input:disabled {
        color: #000;
    }
    .result .right label {
        background-color: rgb(180,240,100) !important;
    }
    .result .right input {
        width: 70%;
        background-color: rgb(180,240,100) !important;
    }
    .result button {
        font-family: inherit;
        font-size: inherit;
        float: right;
        height: 1.7em;
        box-sizing: border-box;
        padding: 0 0.5em;
        line-height: 1;
        background-color: transparent;
        border: none;
        color: rgb(170,30,30);
        outline: none;
    }
    .result .left button:disabled {
        color: #eee !important;
    }
    .result .right button:disabled {
        color: rgb(180,240,100) !important;
    }
</style>

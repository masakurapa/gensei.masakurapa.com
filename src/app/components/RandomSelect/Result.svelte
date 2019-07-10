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
                <RemoveButton id="{item.id}"/>
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
                <RemoveButton id="{item.id}" disabledColor="rgb(180,240,100)"/>
            </label>
        {/each}
    </div>
</div>

<script>
    import { quintOut } from 'svelte/easing'
    import { crossfade } from 'svelte/transition'
    import { flip } from 'svelte/animate'
    import { tempUserList } from './store.js'

    import RemoveButton from '../../common/RemoveButton.svelte'

    // 抽選対象用のユーザーリスト
    $: targetUserList = $tempUserList.filter(item => item.rank === 0)
    // 抽選結果用のユーザーリスト
    $: resultUserList = $tempUserList.filter(item => item.rank !== 0).sort((a, b) => a.rank > b.rank ? 1 : -1)

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
    .left,
    .right {
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
    label {
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
    input {
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
    input:disabled {
        color: #000;
    }
    .right label {
        background-color: rgb(180,240,100) !important;
    }
    .right input {
        width: 70%;
        background-color: rgb(180,240,100) !important;
    }
</style>

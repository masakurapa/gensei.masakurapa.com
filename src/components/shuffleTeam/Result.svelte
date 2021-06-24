<div class="result">
    {#each $resultUserList as users, i}
        <div class="{i % 2 === 0 ? 'left' : 'right'}">
            <h2>チーム{i + 1} <small>({users.length}人)</small></h2>
            {#each users as { id, name} (id)}
                <label
                    in:receive={{ key: id }}
                    animate:flip
                >
                    <input disabled bind:value={name}>
                </label>
            {/each}
        </div>
    {/each}
</div>

<script>
    import { quintOut } from 'svelte/easing'
    import { crossfade } from 'svelte/transition'
    import { flip } from 'svelte/animate'
    import { resultUserList } from 'components/shuffleTeam/store.js'

    // アニメーションの設定
    const [receive] = crossfade({
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
        margin: 0 0.25em 1.5em 0.25em;
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
</style>

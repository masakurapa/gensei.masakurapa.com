<div style:height="{itemHeight}px">
    <div class="result">
        {#each $resultUserList as users, i}
            <div class="result__box" style:height="{users.length * 56 + 56 + 24}px">
                <div class="result__header">チーム{i + 1} <small>({users.length}人)</small></div>

                {#each users as { id, name} (id)}
                    <div
                        class="result__item"
                        in:receive={{ key: id }}
                        animate:flip
                    >
                        <Chip size="midium">{name}</Chip>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>

<script lang="ts">
    import { quintOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { userList, resultUserList } from './store';

    import Chip from '../../parts/chip/Chip.svelte';

    // 結果の表示領域の高さを計算
    // 1boxあたりの高さ = 抽選対象の各行(56px) + タイトルの高さ(56px) + バッファ(24px)
    $: itemHeight = $userList.length * 56 + 56 + 24;

    // アニメーションの設定
    const [receive] = crossfade({
        duration: d => Math.sqrt(d * 200),
        fallback (node, _) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 400,
                easing: quintOut,
                css: t => `
                    transform: ${transform} scale(${t})
                    opacity: ${t}
                `,
            };
        },
    });
</script>

<style>
    .result {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    .result__box {
        display:inline-block;
        padding: 8px;
        width: 300px;
        border: 0.1em solid #668ad8;
        border-radius: 16px;
        box-sizing: border-box;
        margin-bottom: 24px;
        margin-right: 32px;
    }

    .result__header {
        text-align: center;
        font-size: 24px;
        line-height: 56px;
        font-weight: bold;
    }

    .result__item {
        text-align: center;
    }
</style>

<div class="result">
    <div class="result__box">
        <div class="result__header">抽選対象</div>

        {#each targetUserList as item (item.id)}
            <div
                class="result__item"
                in:receive={{ key: item.id }}
                out:send={{ key: item.id }}
                animate:flip
            >
                <Chip size="large">{item.name}</Chip>
            </div>
        {/each}
    </div>

    <div class="result__box">
        <div class="result__header">抽選結果</div>

        {#each resultUserList as item (item.id)}
            <div
                class="result__item"
                in:receive={{ key: item.id }}
                out:send={{ key: item.id }}
                animate:flip
            >
                <Chip size="large">{item.rank} {item.name}</Chip>
            </div>
        {/each}
    </div>
</div>

<script lang="ts">
    import { quintOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { tempUserList } from './store';

    import Chip from '../../parts/chip/Chip.svelte';

    // 抽選対象用のユーザーリスト
    $: targetUserList = $tempUserList.filter(item => item.rank === 0);
    // 抽選結果用のユーザーリスト
    $: resultUserList = $tempUserList.filter(item => item.rank !== 0).sort((a, b) => a.rank > b.rank ? 1 : -1);

    // アニメーションの設定
    const [send, receive] = crossfade({
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
        width: 900px;
        justify-content: space-between;
    }

    .result__box {
        padding: 8px;
        width: 400px;
        border: 0.1em solid #668ad8;
        border-radius: 16px;
        box-sizing: border-box;
        background-color: #FFFFFF;
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

    @media screen and (max-width: 949px) {
        .result {
            width: 700px;
        }
        .result__box {
            padding: 4px;
            width: 300px;
        }
        .result__item {
            width: 240px;
        }
    }

    @media screen and (max-width: 749px) {
        .result {
            display: block;
            width: 100%;
        }
        .result__box {
            padding: 4px;
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
            margin-bottom: 24px;
        }
        .result__item {
            width: 240px;
            margin: 0 auto;
        }
    }
</style>

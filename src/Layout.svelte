<div class="container">
    <aside class="container__sidebar">
        <div class="menu">
            <div class="menu__title">抽選方法</div>

            {#each components as row (row.value)}
                <div
                    class="menu__item"
                    class:menu__active={component.value === row.value}
                    class:menu__item__disabled={$processing}
                    on:click="{() => onClickMenuItem(row)}"
                >{row.text}</div>
            {/each}
        </div>
    </aside>

    <main class="container__main">
        <svelte:component this={component.component}/>
    </main>
</div>

<!-- TODO: legacy削除後にfooterは削除 -->
<footer>
    <div class="footer__title">&copy;2019 厳正な抽選ツール</div>
    <div class="footer__link">
        <i class="fab fa-github-square" style="color: black; font-size: 1.5em;"></i>
        <a href="https://github.com/masakurapa/gensei.masakurapa.com" target="_blank">gensei.masakurapa.com</a>
    </div>
</footer>

<script lang="ts">
    import type { Component, ComponentList } from './@types/component';

    import { processing } from './store';

    import Random from './components/services/random/Index.svelte';
    import Amidakuji from './components/services/amidakuji/Index.svelte';
    import Slot from './components/services/slot/Index.svelte';
    import ShuffleTeam from './components/services/shuffle_team/Index.svelte';

    const components: ComponentList = [
        { value: 'amidakuji', text: 'あみだくじ', component: Amidakuji },
        { value: 'random', text: 'ランダム', component: Random },
        { value: 'slot', text: 'スロット', component: Slot },
        { value: 'shuffleTeam', text: 'チーム分け', component: ShuffleTeam },
    ];

    // デフォルトはcomponentsの先頭を表示
    let component: Component = components[0];
    // メニュー変更
    const onClickMenuItem = (value: Component) => {
        if ($processing) {
            return;
        }
        component = value;
    }
</script>

<style>
    .container {
        display: flex;
    }

    .container__sidebar {
        width: 240px;
        height: calc(100vh - 36px - 80px); /* 画面の高さからheader/footer分の高さを引く */
        position: sticky;
        top: 0;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .container__main {
        flex: 1;
        overflow: auto;
        padding: 16px;
        margin: 0 calc(50% - 50vw);
        width: 100vw;
    }

    .menu {
        display: flex;
        flex-direction: column;
    }

    .menu__title {
        padding-left: 8px;
        font-size: 20px;
        line-height: 60px;
        font-weight: bold;
        text-decoration: underline;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    }

    .menu__item {
        padding-left: 8px;
        font-size: 20px;
        line-height: 60px;
        cursor: pointer;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    }

    .menu__item:hover {
        background-color: #F0F0F0;
    }

    .menu__item__disabled {
        cursor: unset;
    }

    .menu__active {
        background-color: #F0F0F0;
    }

    /* TODO: legacy削除後に以下のCSSは削除 */
    header {
        background-color: #659AD2;
        color: #FFF;
        font-size: 20px;
        font-weight: bold;
        line-height: 36px;
        text-align: center;
    }
    footer {
        position: fixed;
        left: 0;
        bottom: 0;
        padding: 12px 0 12px 12px;
    }

    .footer__title {
        margin-bottom: 5px;
    }

    .footer__link {
        display: inline-flex;
        align-items: center
    }
</style>

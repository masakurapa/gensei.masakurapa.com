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

<script lang="ts">
    import type { Component, ComponentList } from './@types/component';

    import { processing } from './store';

    import Random from './components/services/random/Index.svelte';
    import Amidakuji from './components/amidakuji/Amidakuji.svelte';
    import Slot from './components/slot/Slot.svelte';
    import ShuffleTeam from './components/shuffleTeam/ShuffleTeam.svelte';

    const components: ComponentList = [
        // { value: 'amidakuji', text: 'あみだくじ', component: Amidakuji },
        { value: 'random', text: 'ランダム', component: Random },
        // { value: 'slot', text: 'スロット', component: Slot },
        // { value: 'shuffleTeam', text: 'チーム分け', component: ShuffleTeam },
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
</style>

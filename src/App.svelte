<div class="container">
    <aside class="container__menu">
        <div class="menu">
            {#each components as row (row.value)}
                {#if row.component}
                    <div
                        class="menu__item"
                        class:menu__active={component.value === row.value}
                        class:menu__item__disabled={$processing}
                        on:click="{() => onClickMenuItem(row)}"
                    >{row.text}</div>
                {:else}
                    <div class="menu__title">{row.text}</div>
                {/if}
            {/each}
        </div>
    </aside>

    <main class="container__main">
        <svelte:component this={component.component}/>
    </main>
</div>

<script lang="ts">
    import { onMount } from 'svelte';
    import type { Component, ComponentList } from './@types/component';

    import { processing, setUser } from './store';
    import { getUserList, isSkipAbort } from './storage';

    import About from './components/services/about/Index.svelte';
    import Amidakuji from './components/services/amidakuji/Index.svelte';
    import Random from './components/services/random/Index.svelte';
    import Slot from './components/services/slot/Index.svelte';
    import ShuffleTeam from './components/services/shuffle_team/Index.svelte';
    import Gift from './components/services/gift/Index.svelte';

    const components: ComponentList = [
        { value: 'abort', text: 'サイトの説明',  component: About },
        { value: 'lot-title', text: '抽選方法' },
        { value: 'amidakuji', text: 'あみだくじ',  component: Amidakuji },
        { value: 'random', text: 'ランダム',  component: Random },
        { value: 'slot', text: 'スロット',  component: Slot },
        { value: 'shuffleTeam', text: 'チーム分け',  component: ShuffleTeam },
        { value: 'gitf', text: '景品を抽選',  component: Gift },
    ];

    // デフォルトはcomponentsの先頭を表示
    let component: Component = !isSkipAbort() ? components[0] : components[2];
    // メニュー変更
    const onClickMenuItem = (value: Component) => {
        if ($processing) {
            return;
        }
        component = value;
    }

    onMount(() => {
        // マウント時にユーザーリストをローカルストレージから復元
        // ここ以外で復元すると機能切替時に入力内容が消える
        setUser(getUserList());
    });
</script>

<style>
    .container {
        display: flex;
    }

    .container__menu {
        width: 240px;
        height: calc(100vh - 36px - 80px); /* 画面の高さからheader/footer分の高さを引く */
        position: sticky;
        top: 0;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .container__menu::-webkit-scrollbar {
        display: none;
    }

    .container__main {
        flex: 1;
        overflow: auto;
        padding: 16px;
        margin: 0 calc(50% - 50vw);
        width: 100vw;
    }
    .container__main::-webkit-scrollbar {
        display: none;
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

    @media screen and (max-width: 1179px) {
        .container {
            display: block;
            min-height: calc(100vh - 36px - 40px - 20px); /* 画面の高さからheader/menu/footer分の高さを引く */
        }

        .container__menu {
            width: 100%;
            height: 40px;
            position: sticky;
            top: 0;
            overflow-y: hidden;
            overflow-x: auto;
            padding-bottom: 16px;
            background-color: #FFFFFF;
            z-index: 1;
        }

        .menu {
            display: flex;
            flex-direction: unset;
        }
        .menu__title {
            display: none;
        }
        .menu__item {
            flex-grow: 1;
            display: inline-block;
            min-width: 140px;
            padding-left: 0;
            font-size: 20px;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
            border: 1px solid rgba(0, 0, 0, 0.3);
            border-top: none;
            border-left: none;
        }

        .container__main {
            flex: unset;
            overflow: auto;
            padding: 16px;
            margin: 0;
            width: unset;
        }
        .container__main::-webkit-scrollbar {
            display: none;
        }
    }
</style>

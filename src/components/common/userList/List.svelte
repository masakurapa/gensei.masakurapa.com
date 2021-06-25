<div class="user-list-wrapper">
    <CollapseSimpleFrame id="user-list" label="抽選対象リスト">
        <div class="items">
            {#each $userList as item (item.id)}
                <div class="label">
                    <div class="name">{item.name}</div>
                    <div>
                        <button
                            disabled={$processing}
                            on:click="{() => removeUser(item.id)}"
                        >x</button>
                    </div>
                </div>
            {/each}
        </div>
    </CollapseSimpleFrame>
</div>

<script lang="ts">
    import { userList, processing, removeUser } from '../../../store';
    import CollapseSimpleFrame from '../collapse/CollapseSimpleFrame.svelte';
</script>

<style>
    .user-list-wrapper {
        margin-top: 1em;
    }

    .items {
        display: flex;
        flex-wrap: wrap;
    }

    .label {
        top: 0;
        left: 0;
        display: block;
        font-size: 0.75em;
        line-height: 1;
        padding: 0.5em;
        margin: 0.5em 0.5em 0 0;
        border-radius: 0.5em;
        background-color: #eee;
        user-select: none;
        width: 25%;
        display: flex;
    }
    .name {
        height: 2em;
        width: 70%;
        font-family: inherit;
        font-size: inherit;
        padding: 0.3em 0 0 0.4em;
        margin: 0;
        box-sizing: border-box;
        border: 0;
        background-color: #eee;
        text-align: left;
        word-wrap: break-word;
    }

    button {
        font-family: inherit;
        font-size: inherit;
        float: right;
        height: 1.7em;
        box-sizing: border-box;
        padding: 0 0.5em;
        line-height: 1;
        background-color: transparent;
        border: none;
        outline: none;
        color: rgb(170,30,30);
    }
    button:disabled {
        color: #eee;
    }
</style>

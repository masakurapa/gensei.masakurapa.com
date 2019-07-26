<div class="user-list-wrapper">
    <CollapseSimpleFrame id="user-list" label="抽選対象リスト">
        <div class="items">
            {#each $userList as item (item.id)}
                <label>
                    <div class="name">{item.name}</div>
                    <div><RemoveButton id={item.id}/></div>
                </label>
            {/each}
        </div>
    </CollapseSimpleFrame>
</div>

<script>
    import { userList } from 'app/store.js'
    import RemoveButton from 'parts/button/RemoveButton.svelte'

    import CollapseSimpleFrame from 'components/common/collapse//CollapseSimpleFrame.svelte'
</script>

<style>
    .user-list-wrapper {
        margin-top: 1em;
    }

    .items {
        display: flex;
        flex-wrap: wrap;
    }

    label {
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
</style>

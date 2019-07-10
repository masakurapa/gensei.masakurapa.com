{#if $userList.length > 0}
    <ComponentFrame>
        <InputGroup label="抽選対象リスト"/>
        <div class="items">
            {#each $userList as item (item.id)}
                <label>
                    <input disabled bind:value={item.name}>
                    <RemoveButton id={item.id}/>
                </label>
            {/each}
        </div>
    </ComponentFrame>
{/if}

<script>
    import { userList } from '../store.js'
    import ComponentFrame from './ComponentFrame.svelte'
    import InputGroup from '../forms/common/InputGroup.svelte'
    import RemoveButton from './RemoveButton.svelte'
</script>

<style>
    .items {
        display: flex;
        flex-wrap: wrap;
    }

    .items label {
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
        width: 10em;
    }
    .items input {
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
    .items input:disabled {
        color: #000;
    }
</style>

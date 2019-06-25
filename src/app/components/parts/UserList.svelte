{#if $userList.length > 0}
    <div class="top">
        <div class="input-group">
            <label>抽選対象リスト</label>
        </div>
        <div class="items">
            {#each $userList as item (item.id)}
                <label>
                    <input disabled bind:value={item.name}>
                    <button
                        class="remove-button"
                        disabled={$processing}
                        on:click="{() => removeUser(item.id)}"
                    >x</button>
                </label>
            {/each}
        </div>
    </div>
{/if}

<script>
    import {
        userList,
        processing,
        removeUser,
    } from '../../store.js'
</script>

<style>
    .top {
        margin: auto;
        margin-top: 1em;
        padding: 1em;
        width: 80%;
        max-width: 450px;
        background-color: #FFFFFF;
        border: 0.1em solid #668ad8 !important;
        border-radius: 2em;
    }

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

    .remove-button {
        font-family: inherit;
        font-size: inherit;
        float: right;
        height: 1.7em;
        box-sizing: border-box;
        padding: 0 0.5em;
        line-height: 1;
        background-color: transparent;
        border: none;
        color: rgb(170,30,30);
        outline: none;
    }
    .remove-button:disabled {
        color: #eee !important;
    }
</style>

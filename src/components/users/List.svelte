<div class="user_list">
    <div class="user_list__item">
        {#each $userList as item (item.id)}
            <div class="chip">
                <div class="chip__content">{item.name}</div>
                <button
                    class="button"
                    disabled={$processing}
                    on:click="{() => removeUser(item.id)}"
                >
                    <div class="button__line button__line--first"></div>
                    <div class="button__line button__line--second"></div>
                </button>
            </div>
        {/each}
    </div>
</div>

<script lang="ts">
    import { userList, processing, removeUser } from '../../store';
</script>

<style>
    .user_list {
        margin-top: 1em;
    }

    .user_list__item {
        display: flex;
        flex-wrap: wrap;
    }

    .chip {
        align-items: center;
        display: inline-flex;
        justify-content: space-between;
        background-color: #EEE;
        border-radius: 16px;
        padding: 4px 12px;
        margin: 4px;
        height: 36px;
        width: 100px;
        user-select: none;
        font-size: small;
    }

    .chip__content {
        width: 72px;
        word-wrap: break-word;
    }


    .button {
        background-color: transparent;
        border-color: transparent;
        cursor: pointer;
        height: 16px;
        width: 16px;
        position: relative;
    }

    .button__line {
        background-color: rgb(170,30,30);
        position: absolute;
        height: 1px;
        width: 100%;
    }

    .button__line--first {
        left: 0px;
        top: 50%;
        transform: translate(0%, -50%) rotate(45deg);
        height: 1px;
        width: 100%;
    }

    .button__line--second {
        left: 50%;
        top: 0px;
        transform: translate(-50%, 0%) rotate(45deg);
        height: 100%;
        width: 1px;
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

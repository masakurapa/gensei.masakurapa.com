<button
    {disabled}
    on:click
    class="{SIZE[size]}"
>
    <slot></slot>
</button>

<script lang="ts">
    const SIZE = {
        'midium': 'midium__btn',
    } as const;
    type SIZE_TYPE = 'midium';

    // 呼び出し元からボタンを無効にするためのフラグ
    export let disabled = false;
    export let size: SIZE_TYPE;
</script>

<style>
    button {
        height: 40px;
        font-family: inherit;
        font-size: inherit;
        padding: 0.5em;
        box-sizing: border-box;
        border: 0.05em solid #ccc;
        border-radius: 0.25em;
        background-color: #FAC710;
        color: #000000;
        outline: none;
        cursor: pointer;
    }
    button:disabled {
        background-color: #ddd !important;
        color: #FFFFFF;
        cursor: unset;
    }
    button:focus {
        border-color: #666;
    }

    .small__btn {
        width: 60px;
    }
    .midium__btn {
        width: 200px;
    }
    .large__btn {
        width: 400px;
    }
</style>

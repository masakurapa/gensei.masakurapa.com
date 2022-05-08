<button
    {disabled}
    on:click
    class="{SIZE[size]}"
>
    <slot></slot>
</button>

<script lang="ts">
    const SIZE = {
        'small': 'small__btn',
        'midium': 'midium__btn',
    } as const;
    type SIZE_TYPE = 'small' | 'midium';

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
        background-color: #1976d2;
        color: #FFFFFF;
        outline: none;
        cursor: pointer;
    }
    button:disabled {
        background-color: #ddd !important;
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
</style>

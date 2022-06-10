<button
    {disabled}
    on:click
>
    <slot></slot>
</button>

<script lang="ts">
    // 呼び出し元からボタンを無効にするためのフラグ
    export let disabled = false;
</script>

<style>
    button {
        width: 120px;
        height: 40px;
        font-family: inherit;
        font-size: inherit;
        padding: 0.5em;
        box-sizing: border-box;
        border: 0.05em solid #ccc;
        border-radius: 0.25em;
        background-color: #F24726;
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
</style>

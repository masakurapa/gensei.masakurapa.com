<button
    {disabled}
    on:click
    class="{SIZE[size]} {FONT_SIZE[fontSize]}"
>
    <slot></slot>
</button>

<script lang="ts">
    const SIZE = {
        '30_80': 'btn__h30_w80',
        '40_200': 'btn__h40_w200',
    } as const;
    type SIZE_TYPE = keyof typeof SIZE;

    const FONT_SIZE = {
        'default': 'fnt__default',
        'small': 'fnt__small',
    }
    type FONT_SIZE_TYPE = keyof typeof FONT_SIZE ;

    // 呼び出し元からボタンを無効にするためのフラグ
    export let disabled = false;
    export let size: SIZE_TYPE;
    export let fontSize: FONT_SIZE_TYPE = 'default';
</script>

<style>
    button {
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

    .fnt__default {
        font-size: inherit;
    }
    .fnt__small {
        font-size: small;
    }

    .btn__h30_w80 {
        height: 30px;
        width: 80px;
        padding: 0;
    }
    .btn__h40_w200 {
        height: 40px;
        width: 200px;
    }
</style>

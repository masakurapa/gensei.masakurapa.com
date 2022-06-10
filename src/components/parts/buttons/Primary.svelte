<button
    {disabled}
    on:click
    class="{SIZE[size]} {FONT_SIZE[fontSize]}"
>
    <slot></slot>
</button>

<script lang="ts">
    const SIZE = {
        '30_200': 'btn__h30_w200',
        '40_30': 'btn__h40_w30',
        '40_60': 'btn__h40_w60',
        '40_200': 'btn__h40_w200',
        '40_400': 'btn__h40_w400',
    } as const;
    type SIZE_TYPE = keyof typeof SIZE ;

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

    .fnt__default {
        font-size: inherit;
    }
    .fnt__small {
        font-size: small;
    }

    .btn__h30_w200 {
        height: 30px;
        width: 200px;
        padding: 0;
    }

    .btn__h40_w30 {
        height: 40px;
        width: 30px;
        padding: 0;
    }
    .btn__h40_w60 {
        height: 40px;
        width: 60px;
    }
    .btn__h40_w200 {
        height: 40px;
        width: 200px;
    }
    .btn__h40_w400 {
        height: 40px;
        width: 400px;
    }
</style>

<button
    {disabled}
    on:click
    class="{WIDTH[width]} {HEIGHT[height]} {FONT_SIZE[fontSize]}"
>
    <slot></slot>
</button>

<script lang="ts">
    const WIDTH = {
        'x-small': 'width_x-small',
        'small': 'width_small',
        'middle': 'width_middle',
        'lerge': 'width_lerge',
    } as const;
    type WIDTH_TYPE = keyof typeof WIDTH ;

    const HEIGHT = {
        'small': 'height_small',
        'middle': 'height_middle',
    } as const;
    type HEIGHT_TYPE = keyof typeof HEIGHT ;

    const FONT_SIZE = {
        'middle': 'font_middle',
        'small': 'font_small',
    }
    type FONT_SIZE_TYPE = keyof typeof FONT_SIZE ;

    // 呼び出し元からボタンを無効にするためのフラグ
    export let disabled = false;
    export let width: WIDTH_TYPE;
    export let height: HEIGHT_TYPE;
    export let fontSize: FONT_SIZE_TYPE = 'middle';
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

    .width_x-small {
        width: 30px;
        padding-left: 0;
        padding-right: 0;
    }
    .width_small {
        width: 60px;
        padding-left: 0;
        padding-right: 0;
    }
    .width_middle { width: 200px; }
    .width_lerge { width: 400px; }

    .height_small {
        height: 30px;
        padding-top: 0;
        padding-bottom: 0;
        line-height: 26px;
    }
    .height_middle { height: 40px; }

    .font_middle { font-size: inherit; }
    .font_small { font-size: small; }

    @media screen and (max-width: 699px) {
        .width_lerge { width: 300px; }
    }
</style>

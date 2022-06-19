<button
    {disabled}
    on:click
    class="{WIDTH[width]} {HEIGHT[height]}"
>
    <slot></slot>
</button>

<script lang="ts">
    const WIDTH = {
        'middle': 'width_middle',
    } as const;
    type WIDTH_TYPE = keyof typeof WIDTH ;

    const HEIGHT = {
        'middle': 'height_middle',
    } as const;
    type HEIGHT_TYPE = keyof typeof HEIGHT ;

    // 呼び出し元からボタンを無効にするためのフラグ
    export let disabled = false;
    export let width: WIDTH_TYPE;
    export let height: HEIGHT_TYPE;
</script>

<style>
    button {
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

    .width_middle { width: 120px; }
    .height_middle { height: 40px; }

    @media screen and (max-width: 499px) {
        .width_middle { width: 90px; }
    }
</style>

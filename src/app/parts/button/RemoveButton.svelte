<button
    style="color: {color}"
    disabled={$processing}
    on:click="{() => removeUser(id)}"
>x</button>

<script>
    import { processing, removeUser } from '../../store.js'

    // ユーザー削除用のID
    export let id
    // デフォルトの色を変えたい時
    export let defaultColor = 'rgb(170,30,30)'
    // disabledにするときの色を変えたい時
    export let disabledColor = '#eee'

    $: color = $processing ? disabledColor : defaultColor
</script>

<style>
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
    }
</style>

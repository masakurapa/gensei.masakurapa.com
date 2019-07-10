<InputGroup {label}>
    <input
        type=text
        bind:value={value}
        disabled={disabledForm}
        {placeholder}
        {size}
        {maxlength}
    >
</InputGroup>

<script>
    import { processing } from '../store.js'
    import InputGroup from './common/InputGroup.svelte'

    export let value = ''
    export let label = ''
    export let placeholder = ''
    export let size = 10
    export let maxlength = 10
    export let disabled = false

    $: disabledForm = disabled || $processing
</script>

<style>
    input[type="text"] {
        font-family: inherit;
        font-size: inherit;
        padding: 0.4em;
        box-sizing: border-box;
        border: 0.05em solid #ccc;
        border-radius: 0.25em;
    }
    input[type="text"]:disabled {
        background-color: #eee  ;
    }
</style>

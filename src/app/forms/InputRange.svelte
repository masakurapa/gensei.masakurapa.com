<InputGroup {label}>
    <input
        type=range
        bind:value={value}
        {min}
        {max}
        {step}
        disabled={disabledForm}
        on:change
    >
</InputGroup>

<script>
    import { processing } from '../store.js'
    import InputGroup from './common/InputGroup.svelte'

    export let value = 1
    export let label = ''
    export let min = 1
    export let max = 1
    export let step = 1
    export let disabled = false

    $: disabledForm = disabled || $processing
</script>

<style>
    input[type="range"] {
        width: 80%;
        -webkit-appearance: none;
        border: none;
    }

    input[type=range]::-webkit-slider-runnable-track {
        width: 300px;
        height: 1em;
        background: #ddd;
        border: none;
        border-radius: 3px;
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #1976d2;
        margin-top: -5px;
    }

    input[type=range]:disabled::-webkit-slider-thumb {
        background: #eee;
    }

    input[type=range]:focus {
        outline: none;
    }

    input[type=range]:focus::-webkit-slider-runnable-track {
        background: #ccc;
    }
</style>

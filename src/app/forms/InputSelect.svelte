<InputGroup {label}>
    <select on:change disabled={disabledForm}>
        {#each options as data}
            <option value={data.value}>{data.text}</option>
        {/each}
    </select>
</InputGroup>

<script>
    import { processing } from '../store.js'
    import InputGroup from './common/InputGroup.svelte'

    export let label = ''
    export let disabled = false
    export let options = []

    $: disabledForm = disabled || $processing
</script>

<style>
    select {
        font-family: inherit;
        font-size: inherit;
        border: 0.05em solid #ccc;
        height: 2.25em;
        width: 80%;
    }
</style>

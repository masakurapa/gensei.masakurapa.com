<label>
    <input
        type=checkbox
        bind:checked={value}
        disabled={disabledForm}
        on:change="{change}"
    >
    {label}
</label>

<script>
    import { createEventDispatcher } from 'svelte'
    import { processing } from 'app/store.js'

    export let value = false
    export let label = ''
    export let disabled = false

    $: disabledForm = disabled || $processing

    const dispatch = createEventDispatcher()

    function change () {
        dispatch('change', value)
    }
</script>

<style>
</style>

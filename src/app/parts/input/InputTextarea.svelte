<textarea
    bind:value={value}
    placeholder={placeholder}
    rows={rows}
    on:change
    disabled={disabledForm}
></textarea>

<script>
    import { processing } from 'app/store.js'

    export let value = ''
    export let placeholder = ''
    export let rows = 5
    export let disabled = false

    $: disabledForm = disabled || $processing
</script>

<style>
    textarea {
        border: 1px solid #668ad8;
        padding: 0.5em;
        width: 80%;
        resize: vertical;
    }
</style>

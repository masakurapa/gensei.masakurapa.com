<textarea
    bind:value={value}
    disabled={disabledForm}
    {placeholder}
    {rows}
    on:change
    on:input
></textarea>

<script lang="ts">
    import { processing } from '../../store.js';

    export let value = '';
    export let placeholder = '';
    export let rows = 5;
    export let disabled = false;

    $: disabledForm = disabled || $processing;
</script>

<style>
    textarea {
        border: 1px solid #668ad8;
        padding: 0.5em;
        width: 80%;
        resize: vertical;
    }
    textarea:disabled {
        border: 1px solid #aaa;
        background-color: #eee;
    }

    input {
        font-family: inherit;
        font-size: inherit;
        padding: 0.4em;
        box-sizing: border-box;
        border: 0.05em solid #ccc;
        border-radius: 0.25em;
    }
    input:disabled {
        background-color: #eee;
    }
</style>

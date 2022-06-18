<div class="wrapper">
    <textarea
        bind:value={value}
        disabled={disabledForm}
        {placeholder}
        {rows}
        on:change
        on:input
    ></textarea>
</div>

<script lang="ts">
    import { processing } from '../../../store.js';

    export let value = '';
    export let placeholder = '';
    export let rows = 5;
    export let disabled = false;

    $: disabledForm = disabled || $processing;
</script>

<style>
    .wrapper {
        max-width: 400px;
        width: 100%;
    }

    textarea {
        border: 1px solid #668ad8;
        padding: 0.5em;
        width: 95%;
        resize: vertical;
    }
    textarea:disabled {
        border: 1px solid #aaa;
        background-color: #eee;
    }
</style>

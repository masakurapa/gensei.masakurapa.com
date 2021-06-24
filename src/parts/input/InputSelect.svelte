<select on:blur disabled={disabledForm}>
    {#each options as data}
        <option value={data.value} selected={data.value === selectedValue}>{data.text}</option>
    {/each}
</select>

<script lang="ts">
    import { processing } from '../../store.js';

    export let disabled = false;
    export let options = [];
    export let selectedValue = '';

    $: disabledForm = disabled || $processing;
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

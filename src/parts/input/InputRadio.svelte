{#each options as data}
    <input
        id="{name}-{data.value}"
        type="radio"
        name="{name}"
        value="{data.value}"
        checked={data.value === selectedValue}
        disabled={disabledForm}
        on:change
    >
    <label for="{name}-{data.value}">{data.text}</label>
{/each}

<script lang="ts">
    import { processing } from '../../store';

    export let disabled = false;
    export let options = [];
    export let name = '';
    export let selectedValue = '';

    $: disabledForm = disabled || $processing;
</script>

<style>
    label {
        margin: 0 1em 0 0;
    }
</style>

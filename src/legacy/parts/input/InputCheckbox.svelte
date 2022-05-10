<label>
    <input
        type=checkbox
        bind:checked={value}
        disabled={disabledForm}
        on:change="{change}"
    >
    {label}
</label>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { processing } from '../../../store';

    export let value = false;
    export let label = '';
    export let disabled = false;

    $: disabledForm = disabled || $processing;

    const dispatch = createEventDispatcher();

    const change = (): void => {
        dispatch('change', value)
    };
</script>

<style>
</style>

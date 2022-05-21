<label class="checkbox">
    <input
        class="checkbox__input"
        type="checkbox"
        bind:checked={value}
        disabled={disabledForm}
        on:change={change}
    >
    <span class="checkbox__dummy"></span>
    <span class="checkbox__label"><slot></slot></span>
</label>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { processing } from '../../../store';

    export let value = false;
    export let disabled = false;

    $: disabledForm = disabled || $processing;

    const dispatch = createEventDispatcher();
    const change = (): void => {
        dispatch('change', value)
    };
</script>

<style>
    .checkbox {
        display: flex;
        align-items: center;
    }

    .checkbox__input {
        margin: 0;
        width: 0;
        opacity: 0;
        cursor: pointer;
    }

    .checkbox__dummy {
        position: relative;
        top: 0;
        left: 0;
        display: block;
        width: 32px;
        height: 32px;
        border: solid 2px transparent;
        background: #ddd;
        border-radius: 4px;
        cursor: pointer;
    }
    .checkbox__input:checked + .checkbox__dummy {
        background: #1976d2;
    }
    .checkbox__input:disabled + .checkbox__dummy {
        background-color: #ddd;
        cursor: unset;
    }

    .checkbox__dummy::before {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40%;
        height: 4px;
        border-radius: 2px;
        transform: translate(-6px, 5px) rotateZ(-135deg);
        transform-origin: 2px 2px;
        background: #FFFFFF;
    }
    .checkbox__dummy::after {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 76%;
        height: 4px;
        border-radius: 2px;
        transform: translate(-6px, 5px) rotateZ(-45deg);
        transform-origin: 2px 2px;
        background: #FFFFFF;
    }

    .checkbox__label {
        padding-left: 12px;
        display: block;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
    }
    .checkbox__input:disabled  + .checkbox__dummy + .checkbox__label {
        cursor: unset;
    }
</style>
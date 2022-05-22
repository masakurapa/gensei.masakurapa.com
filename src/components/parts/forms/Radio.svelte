{#each options as data}
    <label class="radio">
        <input
            class="radio__input"
            type="radio"
            name="{name}"
            value="{data.value}"
            checked={data.value === selectedValue}
            disabled={disabledForm}
            on:change
        >
        <span class="radio__dummy"></span>
        <span class="radio__label">{data.text}</span>
    </label>
{/each}

<script lang="ts">
    import type { RadioOption } from '../../../@types/form';

    import { processing } from '../../../store';

    export let disabled = false;
    export let options: RadioOption[] = [];
    export let name = '';
    export let selectedValue = '';

    $: disabledForm = disabled || $processing;
</script>

<style>
    .radio {
        display: flex;
        align-items: center;
        margin-right: 24px;
    }

    .radio__input {
        opacity: 0;
        width: 0;
        margin: 0;
        cursor: pointer;
    }

    .radio__input:checked + .radio__dummy {
        background: #1976d2;
    }
    .radio__input:checked + .radio__dummy::before {
        background: #FFFFFF;
    }
    .radio__input:disabled + .radio__dummy {
        background-color: #ddd;
        cursor: unset;
    }

    .radio__dummy {
        position: relative;
        top: 0;
        left: 0;
        display: block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #ddd;
        border: solid 2px transparent;
        cursor: pointer;
    }
    .radio__dummy::before {
        content: "";
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ddd;
    }

    .radio__label {
        padding-left: 12px;
        display: block;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
    }
    .radio__input:disabled  + .radio__dummy + .radio__label {
        cursor: unset;
    }
</style>

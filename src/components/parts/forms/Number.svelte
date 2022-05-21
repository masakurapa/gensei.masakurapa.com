<div class="stepper">
    <button
        class="stepper__btn stepper__btn-left"
        disabled={disabledForm || value <= min}
        on:click="{onClickDown}"
    >-</button>
    <input
        type="tel"
        class="stepper__input"
        bind:value={value}
        disabled={disabledForm}
        on:input="{onChange}"
        on:change="{onChange}"
    />
    <button
        class="stepper__btn stepper__btn-right"
        disabled={disabledForm || value >= max}
        on:click="{onClickUp}"
    >+</button>
 </div>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { processing } from '../../../store';

    export let value = 1;
    export let min = 1;
    export let max = 1;
    export let step = 1;
    export let disabled = false;

    // 変更前の値を保持しておく
    let oldValue = value;

    $: disabledForm = disabled || $processing;

    const dispatch = createEventDispatcher();

    const onClickDown = () => {
        value -= step;
        if (value < min) {
            value = min;
        }
        oldValue = value;

        // TODO: detail is any type
        dispatch('change', { value });
    }

    const onClickUp = () => {
        value += step;
        if (value > max) {
            value = max;
        }
        oldValue = value;

        // TODO: detail is any type
        dispatch('change', { value });
    }

    // TODO: any type
    const onChange = (event: any): void => {
        const num = Number(event.target.value);
        if (Number.isNaN(num)) {
            value = oldValue;
            return;
        }

        if (num < min) {
            value = min
        }
        if (num > max) {
            value = max
        }
        oldValue = value;

        // TODO: detail is any type
        dispatch('change', { value: num });
    };
</script>

<style>
    .stepper {
        display: flex;
        font-size: 1.5em;
    }

    .stepper__btn {
        cursor: pointer;
        color: #fff;
        font-size: x-large;
        font-weight: bold;
        background-color: #1976d2;
        border: 1px solid #1976d2;
        height: 40px;
        width: 40px;
    }

    .stepper__btn:disabled {
        background-color: #ddd;
        cursor: unset;
    }

    .stepper__btn-left {
        border-radius: 4px 0 0 4px;
    }

    .stepper__btn-right {
        border-radius: 0 4px 4px 0;
    }

    .stepper__input {
        border: 1px solid #1976d2;
        text-align: center;
        width: 300px;
    }
    .stepper__input:disabled {
        background-color: #eee;
    }
</style>

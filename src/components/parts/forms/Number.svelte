<div class="stepper">
    <div class="slider">
        <div class="slider__minus_btn">
            <PrimaryBtn
                size="30_30"
                disabled={disabledForm || value === min}
                on:click={onClickCountDown}
            ><i class="fas fa-minus fa-sm"></i></PrimaryBtn>
        </div>
        <div class="slider__range_wrapper">
            <input
                class="slider__range"
                type="range"
                bind:value={value}
                disabled={disabledForm}
                min={min}
                max={max}
                step={step}
                on:input="{onChange}"
            >
        </div>
        <div class="slider__plus_btn">
            <PrimaryBtn
                size="30_30"
                disabled={disabledForm || value === max}
                on:click={onClickCountUp}
            ><i class="fas fa-plus fa-sm"></i></PrimaryBtn>
        </div>
    </div>
    <div class="slider__label">{value}</div>
 </div>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { processing } from '../../../store';

    import PrimaryBtn from '../buttons/Primary.svelte';

    export let value = 1;
    export let min = 1;
    export let max = 1;
    export let step = 1;
    export let disabled = false;

    // 変更前の値を保持しておく
    let oldValue = value;

    $: disabledForm = disabled || $processing;

    const dispatch = createEventDispatcher();

    const onClickCountDown = () => {
        if (value === min)  {
            return;
        }
        oldValue = value;
        dispatch('change', { value: value - 1 });
    };

    const onClickCountUp = () => {
        if (value === max)  {
            return;
        }
        oldValue = value;
        dispatch('change', { value: value + 1 });
    };

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

    .slider {
        margin: 0 12px 0 12px;
        display: flex;
        align-items: center;
    }

    .slider__minus_btn {
        margin-right: 8px;
    }
    .slider__plus_btn {
        margin-left: 8px;
    }

    .slider__range_wrapper {
        display: flex;
    }
    .slider__range {
        width: 300px;
        -webkit-appearance: none;
    }
    .slider__range:focus {
        outline: none;
    }
    .slider__range::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        background: #1976d2;
        border-radius: 0px;
        border: 0px solid #010101;
    }
    .slider__range::-moz-range-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        background: #1976d2;
        border-radius: 0px;
        border: 0px solid #010101;
    }
    .slider__range::-webkit-slider-thumb {
        border: 0px solid #1976d2;
        box-shadow: 0px 10px 10px rgba(0,0,0,0.25);
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background: #1976d2;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -10px;
    }
    .slider__range::-moz-range-thumb{
        border: 0px solid #1976d2;
        box-shadow: 0px 10px 10px rgba(0,0,0,0.25);
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background: #1976d2;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -10px;
    }

    .slider__range:disabled::-webkit-slider-runnable-track {
        cursor: unset;
        background: #ccc;
    }
    .slider__range:disabled::-moz-range-track {
        cursor: unset;
        background: #ccc;
    }
    .slider__range:disabled::-webkit-slider-thumb {
        border: 0px solid #eee;
        background: #eee;
        cursor: unset;
    }
    .slider__range:disabled::-moz-range-thumb{
        border: 0px solid #eee;
        background: #eee;
        cursor: unset;
    }

    .slider__range::-moz-focus-outer {
        border: 0;
    }

    .slider__label {
        position: relative;
        transform-origin: center center;
        display: block;
        width: 40px;
        height: 40px;
        background: transparent;
        border-radius: 50%;
        line-height: 36px;
        text-align: center;
        font-weight: bold;
        box-sizing: border-box;
        border: 2px solid #1976d2;
        font-size: 16px;
    }
</style>

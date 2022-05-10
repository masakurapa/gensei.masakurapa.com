<InputGroup label="ランダムに <span class='bold-text'>{$trialCount}</span> 回選ばれるまで抽選する">
    <InputRange
        value={$trialCount}
        min="{$trialCountStep}"
        max="{$trialCountStep * 100}"
        step="{$trialCountStep}"
        on:input="{onInput}"
    ></InputRange>
</InputGroup>

<script lang="ts">
    import type { InputEvent } from '../../../../@types/event';
    import { trialCountStep, trialCount } from '../store';
    import InputGroup from '../../../parts/input/InputGroup.svelte';
    import InputRange from '../../../parts/input/InputRange.svelte';

    const onInput = (event: InputEvent): void => {
        trialCount.set(parseInt(event.target.value, 10));
    };
</script>

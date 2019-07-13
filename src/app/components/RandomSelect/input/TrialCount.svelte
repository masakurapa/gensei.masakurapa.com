<InputGroup label="ランダムに <span class='bold-text'>{$trialCount}</span> 回選ばれるまで抽選する">
    <InputRange
        value={$trialCount}
        min="{$trialCountStep}"
        max="{$trialCountStep * 100}"
        step="{$trialCountStep}"
        on:input="{(event) => { setTrialCount(event.target.value) }}"
    ></InputRange>
</InputGroup>

<script>
    import { trialCountStep, trialCount, setTrialCount } from '../store.js'
    import InputGroup from '../../../forms/InputGroup.svelte'
    import InputRange from '../../../forms/InputRange.svelte'
</script>

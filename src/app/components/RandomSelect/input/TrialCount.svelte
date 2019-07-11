<InputGroup label="抽選の厳正感 <span class='bold-text'>{$trialCount / $trialCountStep}</span> %">
    <InputRange
        value={$trialCount}
        min="{$trialCountStep}"
        max="{$trialCountStep * 100}"
        step="{$trialCountStep}"
        on:change="{(event) => { setTrialCount(event.target.value) }}"
    ></InputRange>
</InputGroup>

<script>
    import { trialCountStep, trialCount, setTrialCount } from '../store.js'
    import InputGroup from '../../../forms/InputGroup.svelte'
    import InputRange from '../../../forms/InputRange.svelte'
</script>

<InputRange
    label="抽選の厳正感 <span class='bold-text'>{$trialCount / $trialCountStep}</span> %"
    value={$trialCount}
    min="{$trialCountStep}"
    max="{$trialCountStep * 100}"
    step="{$trialCountStep}"
    on:change="{(event) => { setTrialCount(event.target.value) }}"
></InputRange>

<script>
    import { trialCountStep, trialCount, setTrialCount } from '../store.js'
    import InputRange from '../../../forms/InputRange.svelte'
</script>

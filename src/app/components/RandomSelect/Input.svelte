<ComponentFrame>
    <TrialCount/>
    <ChoiceNum/>
    <InputUserList subscribe="{resetTempUserList}"/>
</ComponentFrame>

<script>
    import { resetTempUserList } from './store.js'

    import ComponentFrame from '../../common/ComponentFrame.svelte'
    import InputUserList from '../../forms/InputUserList.svelte'
    import TrialCount from './input/TrialCount.svelte'
    import ChoiceNum from './input/ChoiceNum.svelte'
</script>

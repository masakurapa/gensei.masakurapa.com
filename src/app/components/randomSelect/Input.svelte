<ComponentFrame>
    <TrialCount/>
    <ChoiceNum/>
    <InputUserList subscribe="{resetTempUserList}"/>
</ComponentFrame>

<script>
    import { resetTempUserList } from 'components/randomSelect/store.js'

    import ComponentFrame from 'components/common/ComponentFrame.svelte'
    import InputUserList from 'parts/input/InputUserList.svelte'
    import TrialCount from 'components/randomSelect/input/TrialCount.svelte'
    import ChoiceNum from 'components/randomSelect/input/ChoiceNum.svelte'
</script>

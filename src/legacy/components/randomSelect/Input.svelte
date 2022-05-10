<CollapseFrame id="random-select-input" label="③抽選の設定をする">
    <TrialCount/>
    <ChoiceNum/>
</CollapseFrame>

<script lang="ts">
    import { userList } from '../../../store';
    import { resetTempUserList } from './store';

    import CollapseFrame from '../../components/common/collapse/CollapseFrame.svelte';
    import TrialCount from '../../components/randomSelect/input/TrialCount.svelte';
    import ChoiceNum from '../../components/randomSelect/input/ChoiceNum.svelte';

    userList.subscribe((value) => {
        resetTempUserList(value);
    })
</script>

<CollapseFrame id="components" label="①抽選方法を選ぶ">
    <InputSelect
        options="{components}"
        on:change="{changeComponent}"
    ></InputSelect>
</CollapseFrame>

{#if $showUserList}
<UserList style="display: none;"/>
{/if}

<svelte:component this={component}/>

<script>
    import { showUserList } from 'app/store.js'

    import InputSelect from 'parts/input/InputSelect.svelte'
    import CollapseFrame from 'components/common/collapse/CollapseFrame.svelte'
    import UserList from 'components/common/userList/Index.svelte'

    import RandomSelect from 'components/randomSelect/RandomSelect.svelte'
    import Amidakuji from 'components/amidakuji/Amidakuji.svelte'
    import Slot from 'components/slot/Slot.svelte'
    import ShuffleTeam from 'components/shuffleTeam/ShuffleTeam.svelte'

    const components = [
        { value: 0, text: '', component: null },
        { value: 1, text: 'ランダムで選ぶ', component: RandomSelect },
        { value: 2, text: 'あみだくじで選ぶ', component: Amidakuji },
        { value: 3, text: 'スロットで選ぶ（β版）', component: Slot },
        { value: 4, text: 'ランダムでチーム分けする', component: ShuffleTeam },
    ]

    let component = null
    function changeComponent (event) {
        component = components[event.target.value].component
    }
</script>

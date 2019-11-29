<CollapseFrame id="components" label="①抽選方法を選ぶ">
    <InputSelect
        options="{components}"
        selectedValue="{defaultSelected}"
        on:change="{onChangeComponent}"
    ></InputSelect>
</CollapseFrame>

{#if $showUserList}
<UserList style="display: none;"/>
{/if}

<svelte:component this={component}/>

<script>
    import { showUserList } from 'app/store.js'
    import { setLot, getLot, removeLot } from 'app/storage.js'

    import InputSelect from 'parts/input/InputSelect.svelte'
    import CollapseFrame from 'components/common/collapse/CollapseFrame.svelte'
    import UserList from 'components/common/userList/Index.svelte'

    import RandomSelect from 'components/randomSelect/RandomSelect.svelte'
    import Amidakuji from 'components/amidakuji/Amidakuji.svelte'
    import Slot from 'components/slot/Slot.svelte'
    import Gift from 'components/gift/Gift.svelte'
    import ShuffleTeam from 'components/shuffleTeam/ShuffleTeam.svelte'

    const components = [
        { value: '', text: '', component: null },
        { value: 'randomSelect', text: 'ランダムで選ぶ', component: RandomSelect },
        { value: 'amidakuji', text: 'あみだくじで選ぶ', component: Amidakuji },
        { value: 'slot', text: 'スロットで選ぶ', component: Slot },
        { value: 'gift', text: '景品を抽選する（β版）', component: Gift },
        { value: 'shuffleTeam', text: 'ランダムでチーム分けする', component: ShuffleTeam },
    ]

    let component = null

    // ローカルストレージに前回の抽選方法があればデフォルトにする
    const defaultSelected = getLot()
    setComponent(defaultSelected)

    // プルダウン変更
    function onChangeComponent (event) {
        const val = event.target.value
        setComponent(val)
        setLot(val)
    }

    function setComponent (val) {
        let idx = 0
        if (val !== null && val !== '') {
            idx = components.findIndex(obj => {
                return obj.value === val
            })

            // 見つからないvalが来たら一応ローカルストレージを消しておく
            if (idx === -1) {
                idx = 0
                removeLot()
            }
        }
        component = components[idx].component
    }
</script>

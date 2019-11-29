<CollapseFrame id="components" label="①抽選方法を選ぶ">
    <InputSelect
        options="{getComponents()}"
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
    import { isSmartPhone } from 'app/util.js'
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
        { value: '', text: '', useSp: true, component: null },
        { value: 'randomSelect', text: 'ランダムで選ぶ', useSp: true, component: RandomSelect },
        { value: 'amidakuji', text: 'あみだくじで選ぶ', useSp: true, component: Amidakuji },
        { value: 'slot', text: 'スロットで選ぶ', useSp: true, component: Slot },
        { value: 'gift', text: '景品を抽選する（β版）', useSp: false, component: Gift },
        { value: 'shuffleTeam', text: 'ランダムでチーム分けする', useSp: true, component: ShuffleTeam },
    ]

    let component = null

    // スマホか
    const isSp = isSmartPhone()
    // ローカルストレージに前回の抽選方法があればデフォルトにする
    const defaultSelected = getLot()
    setComponent(defaultSelected)

    function getComponents () {
        if (!isSp) {
            return components
        }
        return components.filter(obj => obj.useSp)
    }

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

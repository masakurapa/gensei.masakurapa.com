<CollapseFrame id="components" label="②抽選方法を選ぶ">
    <InputSelect
        options="{components}"
        on:change="{changeComponent}"
    ></InputSelect>
</CollapseFrame>

<svelte:component this={component}/>

<script>
    import InputSelect from 'parts/input/InputSelect.svelte'
    import CollapseFrame from 'components/common/collapse/CollapseFrame.svelte'

    import RandomSelect from 'components/randomSelect/RandomSelect.svelte'
    import Amidakuji from 'components/amidakuji/Amidakuji.svelte'
    import Slot from 'components/slot/Slot.svelte'

    const components = [
        { value: 0, text: '', component: null },
        { value: 1, text: 'ランダムで選ぶ', component: RandomSelect },
        { value: 2, text: 'あみだくじで選ぶ', component: Amidakuji },
        { value: 3, text: 'スロットで選ぶ（β版）', component: Slot },
    ]

    let component = null
    function changeComponent (event) {
        component = components[event.target.value].component
    }
</script>

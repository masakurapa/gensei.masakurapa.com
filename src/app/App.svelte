<ComponentFrame>
    <InputGroup label="抽選方法を選ぶ">
        <InputSelect
            options="{components}"
            on:change="{changeComponent}"
        ></InputSelect>
    </InputGroup>
</ComponentFrame>

<svelte:component this={component}/>

<script>
    import ComponentFrame from './common/ComponentFrame.svelte'
    import InputGroup from './forms/InputGroup.svelte'
    import InputSelect from './forms/InputSelect.svelte'

    import RandomSelect from './components/RandomSelect/RandomSelect.svelte'
    import Amidakuji from './components/Amidakuji/Amidakuji.svelte'
    import Slot from './components/Slot/Slot.svelte'

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

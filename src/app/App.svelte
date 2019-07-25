<CollapseSimpleFrame id="header-description" label="ツールについて">
    <div>ちょっとしたこと、なかなか決められないことなどなど...ツールでサクッと決めちゃいましょう！</div>
    <div>ランダムで選ぶだけではなく、あみだくじ、スロット形式で気分を変えながら抽選ができます！</div>
</CollapseSimpleFrame>

<UserList/>

<CollapseFrame id="components" label="②抽選方法を選ぶ">
    <InputSelect
        options="{components}"
        on:change="{changeComponent}"
    ></InputSelect>
</CollapseFrame>

<svelte:component this={component}/>

<script>
    import InputSelect from 'parts/input/InputSelect.svelte'

    import UserList from 'components/common/userList/Index.svelte'
    import CollapseFrame from 'components/common/collapse/CollapseFrame.svelte'
    import CollapseSimpleFrame from 'components/common/collapse/CollapseSimpleFrame.svelte'

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

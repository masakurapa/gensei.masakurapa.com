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

<style>
    :global(html, body) {
        position: relative;
        width: 100%;
        height: 100%;
    }

    :global(body) {
        background: #F5FFFA !important;
        color: #2c3e50 !important;
        font-family: 'Hannotate SC','Chalkboard SE','ＭＳ 明朝', 'MS Mincho',sans-serif !important;
        margin: 0;
    }

    :global(h1) {
        font-size: 40px !important;
        font-weight: bold !important;
        text-align: center !important;
        margin-block-start: 0 !important;
        margin-block-end: 0 !important;
        margin-inline-start: 0 !important;
        margin-inline-end: 0 !important;
    }

    :global(h2) {
        font-size: 25px !important;
        font-weight: bold !important;
        text-align: center !important;
        margin-block-start: 0 !important;
        margin-block-end: 0 !important;
        margin-inline-start: 0 !important;
        margin-inline-end: 0 !important;
    }

    :global(.bold-text) {
        font-weight: bold;
        color: #be2525;
    }

    :global(.main-wrapper) {
        min-height: 100vh;
        position: relative;
        padding-bottom: 100px;
        box-sizing: border-box;
    }

    :global(.footer) {
        width: 100%;
        background-color: #5db1cf;
        color: #fff;
        text-align: center;
        padding: 15px 0;
        position: absolute;
        bottom: 0;
    }

    :global(.copyright) {
        margin-bottom: 5px;
    }

    :global(.footer-link i) {
        position: relative;
        top: 5px;
        right: 5px;
    }
</style>

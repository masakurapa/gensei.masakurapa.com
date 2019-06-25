<div class="top">
    <div class="input-group">
        <label>抽選方法を選ぶ</label>
        <select on:change="{changeComponent}" disabled={$processing}>
            {#each components as data, i}
                <option value={i}>{data.text}</option>
            {/each}
        </select>
    </div>
</div>
<svelte:component this={component}/>

<script>
    import { processing } from './store.js'

    import RandomSelect from './components/RandomSelect.svelte'
    import Amidakuji from './components/Amidakuji.svelte'

    const components = [
        { text: '', component: null },
        { text: 'ランダムで選ぶ', component: RandomSelect },
        { text: 'あみだくじで選ぶ', component: Amidakuji },
    ]

    let component = null
    function changeComponent () {
        component = components[this.value].component
    }
</script>

<style>
    .top {
        margin: auto;
        margin-top: 1em;
        padding: 1em;
        width: 80%;
        max-width: 450px;
        background-color: #FFFFFF;
        border: 0.1em solid #668ad8 !important;
        border-radius: 2em;
    }
    select {
        font-family: inherit;
        font-size: inherit;
        border: 0.05em solid #ccc;
        height: 2.25em;
        width: 80%;
    }
</style>

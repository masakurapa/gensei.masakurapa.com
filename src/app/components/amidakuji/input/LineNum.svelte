<InputGroup label="あみだくじの行数 <span class='bold'>{$lineNum}</span>/25 行</label>">
    <InputRange
        value={$lineNum}
        max="{maxLineNum}"
        min="{minLineNum}"
        on:input="{(event) => { setLineNum(event.target.value) }}"
    ></InputRange>
</InputGroup>

<script>
    import { lineNum, setLineNum } from 'components/amidakuji/store.js'
    import InputGroup from 'parts/input/InputGroup.svelte'
    import InputRange from 'parts/input/InputRange.svelte'

    // 線を引ける最大行数
    const maxLineNum = 25
    // 線を引ける最小行数
    const minLineNum = 5
</script>

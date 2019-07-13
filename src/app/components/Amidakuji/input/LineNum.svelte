<InputGroup label="横線を引ける行数 <span class='bold'>{$lineNum}</span>/25</label>">
    <InputRange
        value={$lineNum}
        max="{maxLineNum}"
        on:input="{(event) => { setLineNum(event.target.value) }}"
    ></InputRange>
</InputGroup>

<script>
    import { lineNum, setLineNum } from '../store.js'
    import InputGroup from '../../../forms/InputGroup.svelte'
    import InputRange from '../../../forms/InputRange.svelte'

    // 線を引ける最大行数
    const maxLineNum = 25
</script>

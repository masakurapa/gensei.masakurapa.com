<InputRange
    label="横線を引ける行数 <span class='bold'>{$lineNum}</span>/25</label>"
    value={$lineNum}
    max="{maxLineNum}"
    on:change="{(event) => { setLineNum(event.target.value) }}"
></InputRange>

<script>
    import { lineNum, setLineNum } from '../store.js'
    import InputRange from '../../../forms/InputRange.svelte'

    // 線を引ける最大行数
    const maxLineNum = 25
</script>

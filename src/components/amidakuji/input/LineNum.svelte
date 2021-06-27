<InputGroup label="あみだくじの行数 <span class='bold'>{$lineNum}</span>/25 行">
    <InputRange
        value={$lineNum}
        max="{maxLineNum}"
        min="{minLineNum}"
        on:input="{setLineNum}"
    ></InputRange>
</InputGroup>

<script lang="ts">
    import type { InputEvent } from '../../../@types/event';
    import { lineNum } from '../store';
    import InputGroup from '../../../parts/input/InputGroup.svelte';
    import InputRange from '../../../parts/input/InputRange.svelte';

    // 線を引ける最大行数
    const maxLineNum = 25;
    // 線を引ける最小行数
    const minLineNum = 5;

    const setLineNum = (event: InputEvent): void => {
        lineNum.set(parseInt(event.target.value, 10))
    };
</script>

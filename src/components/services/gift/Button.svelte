<WarningBtn
    width="middle"
    height="middle"
    disabled="{disabledFinishBtn}"
    on:click="{() => finish()}"
>やりなおす</WarningBtn>

<script lang="ts">
    import { processing } from '../../../store';
    import {
        winPrizeCount,
        finishedGiftIndex,
        blocking,
        canvases,
     } from './store';

    import WarningBtn from '../../parts/buttons/Warning.svelte';

    $: disabledFinishBtn = $processing || !$blocking;

    const finish = (): void => {
        blocking.set(false);
        winPrizeCount.set([]);
        finishedGiftIndex.set([]);

        $canvases.forEach(obj => {
            if (!obj.ctx) {
                return true;
            }
            // canvasをクリア
            obj.ctx.setTransform(1, 0, 0, 1, 0, 0);
            obj.ctx.clearRect(0, 0, obj.canvas.width, obj.canvas.height);
        });
    }
</script>

<div class="result">
    <div class="canvas-area">
        {#each $canvases as obj, index (obj.no)}
            {#if index < $choiceNum}
                <div class="canvas-box">
                    <canvas
                        width="100"
                        height="100"
                        bind:this="{$canvases[index].canvas}"
                    ></canvas>
                </div>
            {/if}
        {/each}
    </div>
</div>

<script lang="ts">
    import { choiceNum, canvases } from './store';
</script>

<style>
    .result {
        margin: auto;
        margin-top: 1em;
        margin-bottom: 2.5em;
        padding: 1em 2em 1em 2em;
        width: 80%;
        background-color: #FFFFFF;
        border: 0.1em solid #668ad8 !important;
        border-radius: 2em;
        height: auto;
    }
    .canvas-area {
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        width: 90%;
    }
    .canvas-box {
        margin: auto;
    }

    canvas{
        background-color: #e9eefa;
        height: 100px;
        width: 200px;
        left: 0;
        top: 0;
        margin: 10px;
        border-radius: 3em;
        border: 0.1em solid #668ad8;
    }
</style>

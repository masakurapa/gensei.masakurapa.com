<div class="result">
    {#each $canvases as obj, index (obj.no)}
        {#if index < $choiceNum}
            <div><canvas
                width="300"
                height="88"
                bind:this="{$canvases[index].canvas}"
            ></canvas></div>
        {/if}
    {/each}
</div>

<script lang="ts">
    import { choiceNum, canvases } from './store';
</script>

<style>
    .result {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    canvas {
        background-color: #e9eefa;
        height: 88px;
        width: 300px;
        left: 0;
        top: 0;
        margin-bottom: 24px;
        margin-right: 32px;
        border-radius: 3em;
        border: 0.1em solid #668ad8;
    }

    @media screen and (max-width: 704px) {
        .result {
            display: block;
            flex-wrap: unset;
            text-align: center;
        }
        canvas {
            margin-right: 0;
            margin-bottom: 12px;
        }
    }
</style>

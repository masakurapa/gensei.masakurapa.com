<div class="chip" class:highlight={highlight}>
    <div class="chip__content">
        <slot></slot>
    </div>
</div>

<script lang="ts">
    export let highlight = false;
</script>

<style>
    .chip {
        align-items: center;
        display: inline-flex;
        justify-content: space-between;
        background-color: #EEE;
        border-radius: 16px;
        padding: 4px 12px;
        margin: 4px;
        height: 40px;
        width: 300px;
        user-select: none;
    }

    .chip__content {
        word-wrap: break-word;
    }

    .highlight {
        background-color: rgb(180,240,100);
    }
</style>

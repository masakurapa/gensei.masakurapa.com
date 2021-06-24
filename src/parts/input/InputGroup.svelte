<div class="input-group">
    <div class="label">{@html label }</div>
    <slot></slot>
</div>

<script lang="ts">
    export let label = '';
</script>

<style>
    .input-group {
        padding: 1em 0 0 0.5em;
    }
    .input-group:first-child {
        padding: 0.25em 0 0 0.5em;
    }
    .label {
        margin: 0 0 0.25em 0;
    }
</style>

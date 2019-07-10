<div class="input-group">
    <label>{@html label }</label>
    <slot></slot>
</div>

<script>
    export let label = ''
</script>

<style>
    .input-group {
        padding: 1em 0 0 0.5em;
    }
    .input-group:first-child {
        padding: 0.25em 0 0 0.5em;
    }
    label {
        display: block;
        margin: 0 0 0.25em 0;
    }
</style>

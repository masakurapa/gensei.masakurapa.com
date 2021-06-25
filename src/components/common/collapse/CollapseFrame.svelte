<div class="collapse">
    <Collapse {id} {label} {open}>
        <slot></slot>
    </Collapse>
</div>

<script lang="ts">
    import Collapse from './Collapse.svelte'

    export let id: string;
    export let label = '';
    export let open = true;
</script>

<style>
    .collapse {
        margin: auto;
        margin-top: 1em;
        padding: 1em;
        width: 80%;
        max-width: 450px;
        background-color: #FFFFFF;
        border: 0.1em solid #668ad8 !important;
        border-radius: 2em;
    }
</style>

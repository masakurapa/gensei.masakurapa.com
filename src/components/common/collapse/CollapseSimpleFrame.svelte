<div class="collapse">
    <Collapse {id} {label} {open}>
        <slot></slot>
    </Collapse>
</div>

<script lang="ts">
    import Collapse from './Collapse.svelte'

    export let id: string;
    export let label = '';
    export let open = false;
</script>

<style>
    .collapse {
        border: #eaeaea solid 1px;
        margin-bottom: 0;
        padding-left: 0;
        list-style: none;
        text-align: center;
    }
</style>

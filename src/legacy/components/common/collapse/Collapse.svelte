<label class="collapse-btn" for="{id}-callapse">
    {label} <i class="fas {icon}"></i>
</label>
<input
    class="collapse-open"
    type="checkbox"
    id="{id}-callapse"
    aria-hidden="true"
    hidden
    bind:checked={open}
/>
<div class="collapse-painel">
    <div class="collapse-inner">
        <slot></slot>
    </div>
</div>

<script lang="ts">
    export let id: string;
    export let label = '';
    export let open = false;

    $: icon = open ? 'fa-chevron-down' : 'fa-chevron-up';
</script>

<style>
    .collapse-open {
        display: none;
    }
    .collapse-painel {
        visibility: hidden;
        max-height: 0;
        opacity: 0;
        transition: max-height .1s,visibility .3s,opacity .3s;
    }
    .collapse-open:checked ~ .collapse-painel {
        max-height: 100%;
        opacity: 100;
        visibility: visible;
    }
    .collapse-btn {
        background: #FFF;
        border-radius: 2px;
        cursor: pointer;
        display: block;
        padding: 5px 10px;
        font-weight: bold !important;
    }
    .collapse-inner {
        padding: 10px;
        background: #FFF;
        border-top: solid 1px #668ad8;
    }
</style>

<div class="accordion">
    <label class="accordion__header" for="accordion-{id}">
        <div>{title}</div>
        <div><i class="{icon}"></i></div>
    </label>
    <input
        class="accordion__btn"
        type="checkbox"
        id="accordion-{id}"
        aria-hidden="true"
        hidden
        bind:checked={open}
    />
    <div class="accordion_content_wrapper">
        <div class="accordion_content">
            <slot></slot>
        </div>
    </div>
</div>


<script lang="ts">
    export let id: string;
    export let title = '';
    export let open = false;
    $: icon = open ? 'fas fa-minus fa-lg' : 'fas fa-plus fa-lg';
</script>

<style>
    i {
        width: 16px;
    }

    .accordion {
        border: 1px solid #A1C1E4;
        border-radius: 2px;
        width: 900px;
    }

    .accordion__header {
        background: #A1C1E4;
        padding: 8px 16px 8px 8px;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
    }

    .accordion__btn {
        display: none;
    }

    .accordion__btn:checked ~ .accordion_content_wrapper {
        visibility: visible;
        max-height: 100%;
        opacity: 100;
    }

    .accordion_content_wrapper {
        visibility: hidden;
        max-height: 0;
        opacity: 0;
        transition: max-height .1s,visibility .3s,opacity .3s;
        background: #FFF;
    }

    .accordion_content {
        padding: 12px;
    }

    @media screen and (max-width: 1179px) {
        .accordion {
            width: 100%;
        }
    }
</style>

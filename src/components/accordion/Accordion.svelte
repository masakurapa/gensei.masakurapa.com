<div class="accordion">
    <div class="accordion__item">
        <label class="accordion__header" for="accordion-{id}">
            <i class="{icon}"></i> {title}
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
</div>


<script lang="ts">
    export let id: string;
    export let title = '';
    export let open = false;

    $: icon = open ? 'fas fa-caret-down fa-lg' : 'fas fa-caret-right fa-lg';
</script>

<style>
    .accordion {
        border: 1px solid #668ad8;
        border-bottom-color: transparent;
        border-radius: 4px;
        max-width: 1000px;
    }

    .accordion__item {
        border-bottom: 1px solid #668ad8;
    }

    i {
        width: 16px;
    }

    .accordion__header {
        background: #FFF;
        border-radius: 2px;
        cursor: pointer;
        display: block;
        padding: 8px;
        font-weight: bold;
    }
    .accordion__btn {
        display: none;
    }
    .accordion__btn:checked ~ .accordion_content_wrapper {
        max-height: 100%;
        opacity: 100;
        visibility: visible;
    }

    .accordion_content_wrapper {
        visibility: hidden;
        max-height: 0;
        opacity: 0;
        transition: max-height .1s,visibility .3s,opacity .3s;
        border-top: 1px solid #668ad8;
        background: #FFF;
    }

    .accordion_content {
        padding: 8px;
    }
</style>

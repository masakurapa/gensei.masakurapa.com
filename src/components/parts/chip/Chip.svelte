<div class="chip {SIZE[size]}">
    <div class="chip__content">
        <slot></slot>
    </div>
</div>

<script lang="ts">
    const SIZE = {
        'midium': 'midium',
        'large': 'large',
    } as const;
    type SIZE_TYPE = 'midium' | 'large';

    export let size: SIZE_TYPE;
</script>

<style>
    .chip {
        align-items: center;
        display: inline-flex;
        justify-content: space-between;
        background-color: #EEE;
        border-radius: 16px;
        padding: 4px 12px;
        height: fit-content;
        min-height: 40px;
        width: 100%;
        max-width: 300px;
        user-select: none;
    }

    .chip__content {
        word-wrap: break-word;
        word-break: break-all;
        text-align: left;
    }

    .midium {
        width: 200px;
    }
    .large {
        width: 100%;
    }
</style>

<div class="chip {SIZE[size]}">
    <div class="chip__content">
        <slot></slot>
    </div>
</div>

<script lang="ts">
    const SIZE = {
        'midium': 'midium',
    } as const;
    type SIZE_TYPE = 'midium';

    export let size: SIZE_TYPE;
</script>

<style>
    .chip {
        background-color: #EEE;
        border-radius: 16px;
        padding: 4px 12px;
        margin: 4px;
        height: auto;
        width: 32px;
        user-select: none;
    }

    .chip__content {
        word-wrap: break-word;
        word-break: break-all;
        text-align: left;
    }

    .midium {
        min-height: 60px;
    }
</style>

<div class="chip">
    <div class="chip__content">
        <slot></slot>
    </div>
    <button
        class="button"
        disabled={$processing}
        on:click
    >
        <div class="button__line button__line--first"></div>
        <div class="button__line button__line--second"></div>
    </button>
</div>

<script lang="ts">
    import { processing } from '../../store';
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
        height: 36px;
        width: 100px;
        user-select: none;
        font-size: small;
    }

    .chip__content {
        width: 72px;
        word-wrap: break-word;
    }

    .button {
        background-color: transparent;
        border-color: transparent;
        cursor: pointer;
        height: 16px;
        width: 16px;
        position: relative;
    }

    .button__line {
        background-color: rgb(170,30,30);
        position: absolute;
        height: 1px;
        width: 100%;
    }

    .button__line--first {
        left: 0px;
        top: 50%;
        transform: translate(0%, -50%) rotate(45deg);
        height: 1px;
        width: 100%;
    }

    .button__line--second {
        left: 50%;
        top: 0px;
        transform: translate(-50%, 0%) rotate(45deg);
        height: 100%;
        width: 1px;
    }
</style>

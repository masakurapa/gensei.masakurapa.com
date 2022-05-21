<div class="wrapper">
    <div class="label"><slot name="label"></slot></div>
    <slot></slot>
</div>

<style>
    .wrapper {
        display: flex;
        width: 100%;
        margin-bottom: 12px;
    }
    .label {
        width: 300px;
        line-height: 40px;
    }
</style>

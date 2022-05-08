<div class="wrapper">
    <div class="label"><slot name="label"></slot></div>
    <slot></slot>
</div>

<style>
    .wrapper {
        display: flex;
        line-height: 40px;
        width: 100%;
        margin-bottom: 12px;
    }
    .label {
        width: 300px;
    }
</style>

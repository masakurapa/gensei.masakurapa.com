<div class="wrapper">
    <div class="label"><slot name="label"></slot></div>
    <div class="content"><slot></slot></div>
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
    .content {
        width: 100%;
    }

    @media screen and (max-width: 649px) {
        .wrapper {
            display: block;
        }
        .label {
            width: 100%;
        }
    }
</style>

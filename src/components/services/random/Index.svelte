<div class="wrapper">
    <Users/>
</div>
<div class="wrapper">
    <Setting/>
</div>
<div class="wrapper wrapper__btn">
    <Button/>
</div>
<div class="wrapper wrapper__download_btn">
    <DownloadPNG id="random" />
</div>
<div class="wrapper" id="download-random">
    <Result/>
</div>

<script lang="ts">
    import Users from '../../parts/users/Index.svelte';
    import DownloadPNG from '../../parts/download/PNG.svelte';

    import Setting from './Setting.svelte';
    import Button from './Button.svelte';
    import Result from './Result.svelte';
</script>

<style>
    .wrapper {
        margin-bottom: 20px;
    }

    .wrapper__btn {
        width: 900px;
        text-align: center;
    }
    .wrapper__download_btn {
        width: 900px;
        text-align: right;
        margin: 28px 0;
    }
</style>

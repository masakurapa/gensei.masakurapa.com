<div class="wrapper">
    <Users/>
</div>
<div class="wrapper">
    <Setting/>
</div>
<div class="wrapper wrapper__btn">
    <Button/>
</div>
<div class="wrapper">
    <DownloadPNG id="random" />
</div>
<div class="wrapper wrapper__download_content" id="download-png-random">
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
        width: fit-content;
    }

    .wrapper__btn {
        width: 100%;
        max-width: 900px;
        text-align: center;
    }
</style>

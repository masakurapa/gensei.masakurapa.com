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
    <DownloadPNG id="slot" />
</div>
<div class="wrapper wrapper__download_content" id="download-png-slot">
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
        width: 100%;
        max-width: 900px;
        text-align: center;
    }
    .wrapper__download_content {
        width: fit-content;
    }

    @media screen and (max-width: 704px) {
        .wrapper__download_content {
            width: 100%;
        }
    }
</style>

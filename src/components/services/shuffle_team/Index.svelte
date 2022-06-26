<div class="wrapper">
    <Setting/>
</div>

{#if !isSmartPhone()}
    <div class="wrapper">
        <Download/>
    </div>
{/if}

<div class="wrapper wrapper__btn">
    <Button/>
</div>
<div class="wrapper">
    <DownloadPNG id="team" />
</div>
<div class="wrapper wrapper__download_content" id="download-png-team">
    <Result/>
</div>

<script lang="ts">
    import { isSmartPhone } from '../../../util';

    import DownloadPNG from '../../parts/download/PNG.svelte';

    import Setting from './Setting.svelte';
    import Button from './Button.svelte';
    import Download from './Download.svelte';
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

    @media screen and (max-width: 699px) {
        .wrapper__download_content {
            width: 100%;
        }
    }
</style>

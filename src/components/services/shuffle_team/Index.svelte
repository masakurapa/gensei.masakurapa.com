<div class="wrapper">
    <Users/>
</div>

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
    <Result/>
</div>

<script lang="ts">
    import { isSmartPhone } from '../../../util';

    import Users from '../../parts/users/Index.svelte';

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
        width: 900px;
        text-align: center;
    }
</style>
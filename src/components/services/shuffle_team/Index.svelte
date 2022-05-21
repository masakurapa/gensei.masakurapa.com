<div class="wrapper">
    <Users/>
</div>

<div class="wrapper">
    <Setting/>
</div>

{#if !isSmartPhone()}
    <!-- <Download/> -->
{/if}
<div class="wrapper">
    <Button/>
</div>

<div class="wrapper">
    <Result/>
</div>

<script lang="ts">
    import { onMount } from 'svelte';
    import { showUserList } from '../../../store';
    import { isSmartPhone } from '../../../util';

    import Users from '../../users/Index.svelte';

    import Setting from './Setting.svelte';
    import Button from './Button.svelte';
    // import Download from './Download.svelte';
    import Result from './Result.svelte';

    onMount(() => showUserList.set(false));
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
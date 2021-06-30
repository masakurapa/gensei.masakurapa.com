<Input/>
{#if !isSmartPhone()}
    <Download/>
{/if}
<Button/>
<Result/>

<script lang="ts">
    import { onMount } from 'svelte';
    import { showUserList } from '../../store';
    import { isSmartPhone } from '../../util';

    import Input from './Input.svelte';
    import Button from './Button.svelte';
    import Download from './Download.svelte';
    import Result from './Result.svelte';

    onMount(() => showUserList.set(false));
</script>

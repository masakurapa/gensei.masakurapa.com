{#if isSmartPhone()}
    <LayoutSP/>
{:else}
    <LayoutPC/>
{/if}

<script lang="ts">
    import { isSmartPhone } from './util';

    import LayoutPC from './LayoutPC.svelte';
    import LayoutSP from './components/LayoutSP.svelte';
</script>

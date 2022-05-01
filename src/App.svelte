<GlobalCss/>

{#if isSmartPhone()}
    <Layout/>
{:else}
    <LayoutPC/>
{/if}

<script lang="ts">
    import { isSmartPhone } from './util';

    import GlobalCss from './GlobalCss.svelte';
    import Layout from './components/Layout.svelte';
    import LayoutPC from './components/LayoutPC.svelte';
</script>

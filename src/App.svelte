{#if isSmartPhone()}
    <LegacyLayout/>
{:else}
    <Layout/>
{/if}

<script lang="ts">
    import { isSmartPhone } from './util';

    import Layout from './Layout.svelte';
    import LegacyLayout from './legacy/components/Layout.svelte';
</script>

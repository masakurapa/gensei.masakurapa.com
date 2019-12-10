<Input/>
{#if !isSmartPhone()}
    <Download/>
{/if}
<Button/>
<Result/>

<script>
    import { onMount } from 'svelte'
    import { showUserList } from 'app/store.js'
    import { isSmartPhone } from 'app/util.js'

    import Input from 'components/shuffleTeam/Input.svelte'
    import Button from 'components/shuffleTeam/Button.svelte'
    import Download from 'components/shuffleTeam/Download.svelte'
    import Result from 'components/shuffleTeam/Result.svelte'

    onMount(() => showUserList.set(false))
</script>

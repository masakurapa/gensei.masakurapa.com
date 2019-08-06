<Input/>
<Button/>
<Result/>

<script>
    import { onMount, onDestroy } from 'svelte'
    import { showUserList } from 'app/store.js'

    import Input from 'components/shuffleTeam/Input.svelte'
    import Button from 'components/shuffleTeam/Button.svelte'
    import Result from 'components/shuffleTeam/Result.svelte'

    onMount(() => showUserList.set(false))
    onDestroy(() => showUserList.set(true))
</script>

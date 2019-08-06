<Input/>
<Button/>
<Result/>

<script>
    import { onMount } from 'svelte'
    import { showUserList } from 'app/store.js'

    import Input from 'components/shuffleTeam/Input.svelte'
    import Button from 'components/shuffleTeam/Button.svelte'
    import Result from 'components/shuffleTeam/Result.svelte'

    onMount(() => showUserList.set(false))
</script>

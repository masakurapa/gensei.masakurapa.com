<Input/>
<Button/>
<Result/>

<script>
    import { onMount } from 'svelte'
    import { showUserList } from 'app/store.js'

    import Input from 'components/slot/Input.svelte'
    import Button from 'components/slot/Button.svelte'
    import Result from 'components/slot/Result.svelte'

    onMount(() => showUserList.set(true))
</script>

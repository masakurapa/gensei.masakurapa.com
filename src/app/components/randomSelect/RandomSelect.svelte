<Input/>
<Button/>
<Result/>

<script>
    import { onMount } from 'svelte'
    import { showUserList } from 'app/store.js'

    import Input from 'components/randomSelect/Input.svelte'
    import Button from 'components/randomSelect/Button.svelte'
    import Result from 'components/randomSelect/Result.svelte'

    onMount(() => showUserList.set(true))
</script>

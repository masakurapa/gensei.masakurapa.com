<Input/>
<Button/>
<Result/>

<script>
    import { onMount } from 'svelte'
    import { showUserList } from 'app/store.js'

    import Input from 'components/amidakuji/Input.svelte'
    import Button from 'components/amidakuji/Button.svelte'
    import Result from 'components/amidakuji/Result.svelte'

    onMount(() => showUserList.set(true))
</script>

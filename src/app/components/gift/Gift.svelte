<GiftList/>
<UserList/>
<Result/>

<script>
    import { onMount } from 'svelte'
    import { showUserList } from 'app/store.js'

    import GiftList from 'components/gift/GiftList.svelte'
    import UserList from 'components/gift/UserList.svelte'
    import Result from 'components/gift/Result.svelte'

    onMount(() => showUserList.set(false))
</script>

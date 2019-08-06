<CollapseFrame id="user-list-wrapper" label="②抽選対象を入力する">
    <Input/>
    <List/>
    <SaveStorage/>
</CollapseFrame>

<script>
    import { onMount } from 'svelte'
    import { getUserList } from 'app/storage.js'
    import { setUser } from 'app/store.js'

    import CollapseFrame from 'components/common/collapse/CollapseFrame.svelte'
    import Input from 'components/common/userList/Input.svelte'
    import List from 'components/common/userList/List.svelte'
    import SaveStorage from 'components/common/userList/SaveStorage.svelte'

    onMount(() => {
        setUser(getUserList())
    })
</script>

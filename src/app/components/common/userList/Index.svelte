<CollapseFrame id="user-list^wrapper" label="①抽選対象を入力する">
    <Input/>
    <List/>
    <SaveStorage/>
</CollapseFrame>

<script>
    import { onMount } from 'svelte'
    import { getUserList } from 'app/storage.js'
    import { userList } from 'app/store.js'

    import CollapseFrame from 'components/common/collapse/CollapseFrame.svelte'
    import Input from 'components/common/userList/Input.svelte'
    import List from 'components/common/userList/List.svelte'
    import SaveStorage from 'components/common/userList/SaveStorage.svelte'

    onMount(() => {
        userList.set(getUserList())
    })
</script>

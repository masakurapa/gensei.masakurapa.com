<Accordion id="users" title="抽選対象" open>
    <Input/>
    <List/>

    <div class="btn__wrapper">
        <SaveStorage/>
        <RemoveAllUser/>
    </div>
</Accordion>

<script lang="ts">
    import { onMount } from 'svelte';
    import { getUserList } from '../../../storage';
    import { setUser } from '../../../store';

    import Accordion from '../accordion/Accordion.svelte';

    import Input from './Input.svelte';
    import List from './List.svelte';
    import SaveStorage from './SaveStorage.svelte';
    import RemoveAllUser from './RemoveAllUser.svelte';

    onMount(() => {
        // マウント時にユーザーリストをローカルストレージから復元
        setUser(getUserList());
    });
</script>

<style>
    .btn__wrapper {
        margin-top: 16px;
        display: flex;
    }
</style>

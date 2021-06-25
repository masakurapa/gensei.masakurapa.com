<CollapseFrame id="user-list-wrapper" label="②抽選対象を入力する">
    <Input/>
    <List/>
    <SaveStorage/>
</CollapseFrame>

<script lang="ts">
    import { onMount } from 'svelte';
    import { getUserList } from '../../../storage';
    import { setUser } from '../../../store';

    import CollapseFrame from '../collapse/CollapseFrame.svelte';
    import Input from './Input.svelte';
    import List from './List.svelte';
    import SaveStorage from './SaveStorage.svelte';

    onMount(() => {
        setUser(getUserList());
    });
</script>

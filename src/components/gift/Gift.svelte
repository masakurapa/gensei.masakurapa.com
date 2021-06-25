<GiftList/>
<UserList/>
<Setting/>
<Result/>

<script lang="ts">
    import { onMount } from 'svelte';
    import { showUserList } from '../../store';

    import GiftList from './GiftList.svelte';
    import UserList from './UserList.svelte';
    import Setting from './Setting.svelte';
    import Result from './Result.svelte';

    onMount(() => showUserList.set(false));
</script>

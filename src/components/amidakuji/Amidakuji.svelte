<Input/>
<Button/>
<Result/>

<script lang="ts">
    import { onMount } from 'svelte';
    import { showUserList } from '../../store';
    import { selectedNumber } from './store';

    import Input from './Input.svelte';
    import Button from './Button.svelte';
    import Result from './Result.svelte';

    onMount(() => {
        showUserList.set(true);
        selectedNumber.set([]);
    });
</script>

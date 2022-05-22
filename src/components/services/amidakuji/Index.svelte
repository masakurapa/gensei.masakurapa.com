<div class="wrapper">
    <Users/>
</div>
<div class="wrapper">
    <Setting/>
</div>
<div class="wrapper wrapper__btn">
    <Button/>
</div>
<div class="wrapper">
    <Result/>
</div>

<script lang="ts">
    import { onMount } from 'svelte';
    import { selectedNumber } from './store';

    import Users from '../../parts/users/Index.svelte';

    import Setting from './Setting.svelte';
    import Button from './Button.svelte';
    import Result from './Result.svelte';

    onMount(() => {
        selectedNumber.set([]);
    });
</script>


<style>
    .wrapper {
        margin-bottom: 20px;
    }

    .wrapper__btn {
        width: 900px;
        text-align: center;
    }
</style>

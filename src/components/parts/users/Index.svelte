<Accordion id="users" title="抽選対象" open>
    <Input/>

    <div class="btn__wrapper">
        <SaveStorage/>
        <RemoveAllUser/>
    </div>
</Accordion>

<script lang="ts">
    import Accordion from '../accordion/Accordion.svelte';

    import Input from './Input.svelte';
    import SaveStorage from './SaveStorage.svelte';
    import RemoveAllUser from './RemoveAllUser.svelte';
</script>

<style>
    .btn__wrapper {
        margin-top: 16px;
        display: flex;
    }
</style>

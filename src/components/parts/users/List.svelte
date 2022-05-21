<div class="user_list">
    <div class="user_list__item">
        {#each $userList as item (item.id)}
            <Chip on:click={() => removeUser(item.id)}>{item.name}</Chip>
        {/each}
    </div>
</div>

<script lang="ts">
    import { userList, removeUser } from '../../../store';
    import Chip from '../chip/ChipWithDelete.svelte';
</script>

<style>
    .user_list {
        margin-top: 1em;
    }

    .user_list__item {
        display: flex;
        flex-wrap: wrap;
    }
</style>

<DangerBtn
    {disabled}
    on:click="{removeAll}"
>全て削除</DangerBtn>

<script lang="ts">
    import { userList, processing } from '../../../store';

    import DangerBtn from '../buttons/Danger.svelte';

    $: disabled = $processing || $userList.length === 0;

    const removeAll = (): void => {
        if (!confirm('抽選対象を全て削除します。よろしいですか？')) {
            return;
        }
        userList.set([]);
    };
</script>

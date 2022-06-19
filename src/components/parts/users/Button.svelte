<div class="wrapper">
    <PrimaryBtn
        width="middle"
        height="middle"
        disabled={$processing}
        on:click="{save}"
    >抽選対象を保存</PrimaryBtn>
    <DangerBtn
        width="middle"
        height="middle"
        disabled={$processing || $userList.length === 0}
        on:click="{removeAll}"
    >全て削除</DangerBtn>
</div>
<div class="text">※次回アクセス時に保存した抽選対象を使用します</div>

<script lang="ts">
    import { setUserList } from '../../../storage';
    import { userList, processing } from '../../../store';

    import PrimaryBtn from '../buttons/Primary.svelte';
    import DangerBtn from '../buttons/Danger.svelte';

    const save = (): void => {
        if (setUserList($userList)) {
            alert('抽選対象を保存しました');
        } else {
            alert('抽選対象を保存に失敗しました');
        }
    };

    const removeAll = (): void => {
        if (!confirm('抽選対象を全て削除します。よろしいですか？')) {
            return;
        }
        userList.set([]);
    };
</script>

<style>
    .wrapper {
        margin-top: 16px;
        display: flex;
        justify-content: space-between;
        max-width: 500px;
    }

    .text {
        font-size: small;
    }
</style>

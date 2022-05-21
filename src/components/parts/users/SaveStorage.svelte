<div>
    <PrimaryBtn
        size="midium"
        disabled={$processing}
        on:click="{save}"
    >抽選対象を保存する</PrimaryBtn>
    <div class="text">※次回アクセス時に保存した抽選対象を使用します</div>
</div>

<script lang="ts">
    import { setUserList } from '../../../storage';
    import { userList, processing } from '../../../store';

    import PrimaryBtn from '../buttons/Primary.svelte';

    const save = (): void => {
        if (setUserList($userList)) {
            alert('抽選対象を保存しました');
        } else {
            alert('抽選対象を保存に失敗しました');
        }
    };
</script>

<style>
    .text {
        font-size: small;
    }
</style>

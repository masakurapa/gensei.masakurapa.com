<MainButton
    label="抽選対象を保存する"
    btnStyle="{{ width: '200px' }}"
    disabled={$processing}
    on:click="{save}"
></MainButton>
<div class="text">※次回アクセス時に保存した抽選対象を使用します</div>

<script lang="ts">
    import { setUserList } from '../../../storage';
    import { userList, processing } from '../../../store';
    import MainButton from '../../../parts/button/MainButton.svelte';

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
        text-align: center;
        font-size: small;
    }
</style>

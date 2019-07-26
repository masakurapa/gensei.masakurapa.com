<MainButton
    label="抽選対象を保存する"
    labelProcessing="抽選対象を保存する"
    btnStyle="{{ width: '200px' }}"
    on:click="{save}"
></MainButton>
<div class="text">※次回アクセス時に保存した抽選対象を使用します</div>

<script>
    import { setUserList } from 'app/storage.js'
    import { userList } from 'app/store.js'
    import MainButton from 'parts/button/MainButton.svelte'

    function save () {
        if (setUserList($userList)) {
            alert('抽選対象を保存しました')
        } else {
            alert('抽選対象を保存に失敗しました')
        }
    }
</script>

<style>
    .text {
        text-align: center;
        font-size: small;
    }
</style>

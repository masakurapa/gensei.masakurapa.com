<div class="input-area">
    <slot></slot>

    <div class="input-group">
        <label>抽選対象（10文字以内） <span class="bold-text">{$userList.length}</span>/{userListMax}</label>
        <input
            {disabled}
            type=text
            placeholder="Enterを押して対象を追加"
            on:keydown={add}
            size="25"
            maxlength="10"
        >
    </div>
</div>

<script>
    import {
        userList,
        processing,
        addUser,
    } from '../../store.js'

    const userListMax = 15
    // ユーザー追加の無効判定
    $: disabled = $processing || $userList.length >= userListMax

    // ユーザー追加
    function add (event) {
        if (event.which !== 13 || this.value.trim().length === 0) {
            return
        }
        addUser(this.value.trim())
        this.value = ''
    }
</script>

<style>
    .input-area {
        margin: auto;
        margin-top: 1em;
        padding: 1em;
        width: 80%;
        max-width: 450px;
        background-color: #FFFFFF;
        border: 0.1em solid #668ad8 !important;
        border-radius: 2em;
    }
</style>

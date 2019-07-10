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

<script>
    import { userList, processing, addUser } from '../store.js'

    // userList更新時に動かしたい関数
    export let subscribe = () => {}

    userList.subscribe((value) => {
        subscribe(value)
    })

    // 入力可能な対象の最大数
    const userListMax = 15
    // ユーザー追加の無効判定
    $: disabled = $processing || $userList.length >= userListMax

    // ユーザー追加
    function add (event) {
        // event: 13 == Enterキー
        if (event.which !== 13 || this.value.trim().length === 0) {
            return
        }
        addUser(this.value.trim())
        this.value = ''
    }
</script>

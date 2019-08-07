<InputGroup label="抽選対象 <span class='bold-text'>{listSize}</span>人">
    <div><small>改行区切りで入力してください。</small></div>
    <InputTextarea
        value={inputUserList}
        on:change={change}
        on:input={keydown}
    ></InputTextarea>
</InputGroup>

<script>
    import { userList } from 'components/shuffleTeam/store.js'
    import InputGroup from 'parts/input/InputGroup.svelte'
    import InputTextarea from 'parts/input/InputTextarea.svelte'

    let inputUserList = joinUserList($userList)
    let listSize = 0

    function change (event) {
        const filtered = filterUserList(event.target.value)
        inputUserList = joinUserList(filtered)
        userList.set(filtered)
    }

    function keydown (event) {
        listSize = filterUserList(event.target.value).length
    }

    function filterUserList (str) {
        return event.target.value.trim().split(/\n/).filter((val) => val.trim() !== '')
    }
    function joinUserList (list) {
        return list.join('\n')
    }
</script>


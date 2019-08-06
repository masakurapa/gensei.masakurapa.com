<InputGroup label="抽選対象 <span class='bold-text'>{$userList.length}</span>人">
    <div><small>改行区切りで入力してください。</small></div>
    <InputTextarea
        value={inputUserList}
        on:change={change}
    ></InputTextarea>
</InputGroup>

<script>
    import { userList } from 'components/shuffleTeam/store.js'
    import InputGroup from 'parts/input/InputGroup.svelte'
    import InputTextarea from 'parts/input/InputTextarea.svelte'

    let inputUserList = $userList.join('\n')
    function change (event) {
        const filtered = event.target.value.trim().split(/\n/).filter((val) => val.trim() !== '')
        inputUserList = filtered.join('\n')
        userList.set(filtered)
    }
</script>


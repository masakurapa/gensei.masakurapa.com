<CollapseFrame id="gift-user-list-input" label="③抽選対象を設定する">
    <InputGroup label="抽選対象 <span class='bold-text'>{listSize}</span>人">
        <div><small>改行区切りで入力してください。</small></div>
        <InputTextarea
            value={inputUserList}
            on:change={onChange}
            on:input={onKeydown}
            {disabled}
        ></InputTextarea>

        <MainButton
            label="リセット"
            on:click={onClickReset}
            btnStyle={{
                width: '90px',
                padding: '0.25em',
                'background-color': '#ff9933',
                'font-size': 'small',
            }}
            {disabled}
        ></MainButton>
    </InputGroup>
</CollapseFrame>

<script>
    import { processing } from 'app/store.js'
    import { userList, blocking } from 'components/gift/store.js'

    import CollapseFrame from 'components/common/collapse/CollapseFrame.svelte'

    import MainButton from 'parts/button/MainButton.svelte'
    import InputGroup from 'parts/input/InputGroup.svelte'
    import InputTextarea from 'parts/input/InputTextarea.svelte'

    let inputUserList = $userList
    let listSize = 0

    $: disabled = $processing || $blocking

    function onChange (event) {
        const filtered = filterUserList(event.target.value)
        inputUserList = joinUserList(filtered)
        userList.set(filtered)
    }

    function onKeydown () {
        listSize = filterUserList(event.target.value).length
    }

    function onClickReset () {
        inputUserList = []
        userList.set(inputUserList)
    }

    function filterUserList (str) {
        return str.trim().split(/\n/).filter((val) => val.trim() !== '')
    }
    function joinUserList (list) {
        return list.join('\n')
    }
</script>

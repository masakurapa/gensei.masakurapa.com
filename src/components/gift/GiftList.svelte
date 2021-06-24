<CollapseFrame id="gift-list-input" label="②景品を設定する">
    <InputGroup label="景品 <span class='bold-text'>{listSize}</span>個">
        <div><small>改行区切りで入力してください。</small></div>
        <InputTextarea
            value={inputGitfList}
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
    import { giftList, addCanvas, blocking } from 'components/gift/store.js'

    import CollapseFrame from 'components/common/collapse/CollapseFrame.svelte'

    import MainButton from 'parts/button/MainButton.svelte'
    import InputGroup from 'parts/input/InputGroup.svelte'
    import InputTextarea from 'parts/input/InputTextarea.svelte'

    let listSize = 0

    let inputGitfList = $giftList
    $: disabled = $processing || $blocking

    function onChange (event) {
        const filtered = filterGiftList(event.target.value)
        inputGitfList = joinGiftList(filtered)
        giftList.set(filtered)

        for (let i = 0; i < $giftList.length; i++) {
            addCanvas()
        }
    }

    function onKeydown () {
        listSize = filterGiftList(event.target.value).length
    }

    function onClickReset () {
        inputGitfList = []
        giftList.set(inputGitfList)
    }

    function filterGiftList (str) {
        return str.trim().split(/\n/).filter((val) => val.trim() !== '')
    }
    function joinGiftList (list) {
        return list.join('\n')
    }
</script>

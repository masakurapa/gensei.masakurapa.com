<CollapseFrame id="amidakuji-input" label="③あみだくじの設定をする">
    <LineNum/>
</CollapseFrame>

<script>
    import { userList } from 'app/store.js'
    import { lineNum, amidakuji, selectedUserList, disabledWriteLine, setRank, selectedNumber } from 'components/amidakuji/store.js'
    import { generateAmidakuji, generateRandomAmidakuji, shuffleUserList } from 'components/amidakuji/util.js'

    import CollapseFrame from 'components/common/collapse/CollapseFrame.svelte'
    import LineNum from 'components/amidakuji/input/LineNum.svelte'

    lineNum.subscribe(() => {
        reset($userList)
    })

    userList.subscribe((value) => {
        reset(value)
        selectedNumber.set([])
    })

    // あみだくじの内容をリセットする
    function reset (value) {
        disabledWriteLine.set(false)
        setRank(1)
        const newAmidakuji = generateAmidakuji(value, $lineNum)
        if (newAmidakuji.length === 0) {
            return
        }
        amidakuji.set(generateRandomAmidakuji(newAmidakuji, value, $lineNum))
        selectedUserList.set(shuffleUserList(value))
    }
</script>

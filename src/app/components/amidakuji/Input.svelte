<ComponentFrame>
    <LineNum/>
    <InputUserList subscribe="{reset}"/>
</ComponentFrame>

<script>
    import { userList } from '../../store.js'
    import { lineNum, amidakuji, selectedUserList, disabledWriteLine, setRank } from './store.js'
    import { generateAmidakuji, generateRandomAmidakuji, shuffleUserList } from './util.js'

    import ComponentFrame from '../common/ComponentFrame.svelte'
    import InputUserList from '../../parts/input/InputUserList.svelte'
    import LineNum from './input/LineNum.svelte'

    lineNum.subscribe(() => {
        reset($userList)
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

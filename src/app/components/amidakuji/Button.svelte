<MainButton {disabled} label="線を引き直す" on:click="{generate}"/>
<MainButton disabled={!disabled} label="やりなおす" on:click="{reset}"/>

<script>
    import { userList, processing } from 'app/store.js'
    import { lineNum, amidakuji, selectedUserList, disabledWriteLine, selectedNumber, setRank } from 'components/amidakuji/store.js'
    import { generateAmidakuji, generateRandomAmidakuji, shuffleUserList } from 'components/amidakuji/util.js'

    import MainButton from 'parts/button/MainButton.svelte'

    function generate () {
        amidakuji.set(generateRandomAmidakuji($amidakuji, $userList, $lineNum))
    }

    // ボタン無効判定
    $: disabled = $disabledWriteLine || $userList.length === 0 || $processing

    // あみだくじの内容をリセットする
    function reset () {
        disabledWriteLine.set(false)
        selectedNumber.set([])
        setRank(1)
        const newAmidakuji = generateAmidakuji($userList, $lineNum)
        amidakuji.set(generateRandomAmidakuji(newAmidakuji, $userList, $lineNum))
        selectedUserList.set(shuffleUserList($userList))
    }
</script>

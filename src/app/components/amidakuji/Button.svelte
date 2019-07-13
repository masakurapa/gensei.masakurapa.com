<MainButton disabled={$disabledWriteLine} label="ランダムに線を引く" labelProcessing="ランダムに線を引く" on:click="{generate}"/>
<MainButton disabled={!$disabledWriteLine} label="やりなおす" labelProcessing="やりなおす" on:click="{reset}"/>

<script>
    import { userList } from '../../store.js'
    import { lineNum, amidakuji, selectedUserList, disabledWriteLine, rank } from './store.js'
    import { generateAmidakuji, generateRandomAmidakuji, shuffleUserList } from './util.js'

    import MainButton from '../../parts/button/MainButton.svelte'

    function generate () {
        amidakuji.set(generateRandomAmidakuji($amidakuji, $userList, $lineNum))
    }

    // あみだくじの内容をリセットする
    function reset () {
        disabledWriteLine.set(false)
        rank.set(1)
        const newAmidakuji = generateAmidakuji($userList, $lineNum)
        amidakuji.set(generateRandomAmidakuji(newAmidakuji, $userList, $lineNum))
        selectedUserList.set(shuffleUserList($userList))
    }
</script>

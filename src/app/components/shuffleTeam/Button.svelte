<MainButton {disabled} on:click="{run}"/>

<script>
    import { processing } from 'app/store.js'
    import { userList, teamNum, equalityFlag, resultUserList, resetResultUserList } from 'components/shuffleTeam/store.js'
    import { random, sleep, shuffle } from 'app/util.js'
    import MainButton from 'parts/button/MainButton.svelte'

    let id = 1

    // ボタン無効判定
    $: disabled = $userList.length === 0 || $processing

    // 抽選処理
    async function run () {
        processing.set(true)
        resetResultUserList()

        await sleep(1000)

        // グループを選ぶ順番はシャッフル
        const targets = shuffle($userList)

        if ($equalityFlag) {
            await equality(targets)
        } else {
            await bias(targets)
        }

        await sleep(1000)
        processing.set(false)
    }

    // 均等にチーム分けする
    async function equality (targets) {
        // 一つのチームに所属可能な対象の数
        let maxNum = 0
        if (targets.length === $teamNum) {
            maxNum = 1
        } else if ($teamNum === 1) {
            maxNum = targets.length
        } else {
            maxNum = Math.floor(targets.length / $teamNum)
        }

        // 1チームに入れる数を決める
        // 余った枠は先頭から1つずつ割り当てる
        let rem = targets.length % $teamNum
        let teams = []
        for (let no = 0; no <= $teamNum - 1; no++) {
            let count = maxNum
            if (rem > 0) {
                count++
                rem--
            }
            teams.push({ no, count })
        }

        const result = $resultUserList.concat()
        while (targets.length > 0) {
            const no = random(teams.length)
            teams[no].count--

            // 先頭の対象者をグループに入れる
            result[teams[no].no].push({ id: id++, name: targets.shift() })

            // 所属可能な数の最大になったらチーム抽選の対象からは外しておく
            teams = teams.filter(val => val.count !== 0)

            resultUserList.set(result)
            await sleep(50)
        }
    }

    // 均等にチーム分けしない
    async function bias (targets) {
        const result = $resultUserList.concat()
        const num = $teamNum

        while (targets.length > 0) {
            const no = random(num)

            // 先頭の対象者をグループに入れる
            result[no].push({ id: id++, name: targets.shift() })

            resultUserList.set(result)
            await sleep(50)
        }
    }
</script>

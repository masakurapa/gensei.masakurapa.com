<MainButton on:click="{run}"/>

<script>
    import { processing } from 'app/store.js'
    import { userList, teamNum, resultUserList, resetResultUserList } from 'components/shuffleTeam/store.js'
    import { random, sleep, shuffle } from 'app/util.js'
    import MainButton from 'parts/button/MainButton.svelte'

    let id = 1

    // 抽選処理
    async function run () {
        processing.set(true)
        resetResultUserList()

        await sleep(1000)

        // グループを選ぶ順番はシャッフル
        const targets = shuffle($userList)
        // 一つのチームに所属可能な対象の数
        let maxNum = 0
        if (targets.length === $teamNum) {
            maxNum = 1
        } else if ($teamNum === 1) {
            maxNum = targets.length
        } else {
            maxNum = Math.ceil(targets.length / 2)
        }

        // チーム
        let teams = []
        for (let i = 0; i <= $teamNum - 1; i++) {
            teams.push(i)
        }

        const result = $resultUserList.concat()
        while (targets.length > 0) {
            const no = teams[random(teams.length)]

            // 先頭の対象者をグループに入れる
            result[no].push({ id: id++, name: targets.shift() })

            // 所属可能な数の最大になったらチーム抽選の対象からは外しておく
            if (result[no].length === maxNum) {
                teams = teams.filter(val => val !== no)
            }

            resultUserList.set(result)
            await sleep(300)
        }

        await sleep(1000)

        resultUserList.set(result)
        processing.set(false)
    }
</script>

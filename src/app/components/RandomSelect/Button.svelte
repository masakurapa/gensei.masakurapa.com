<MainButton on:click="{run}"/>

<script>
    import { userList, processing } from '../../store.js'
    import { trialCount, choiceNum, tempUserList, resetTempUserList } from './store.js'
    import { random, sleep } from '../../util.js'
    import MainButton from '../../common/MainButton.svelte'

    // 抽選処理
    async function run () {
        processing.set(true)
        resetTempUserList($userList)
        const temp = $tempUserList

        await sleep(1000)

        let rank = 1
        while (temp.filter(item => item.count >= $trialCount).length < $choiceNum) {
            const i = random(temp.length)
            temp[i].count += 1
            if (temp[i].count === $trialCount) {
                await sleep(500)
                temp[i].rank = rank++
                tempUserList.set(temp)
            }
        }

        await sleep(1000)
        processing.set(false)
    }
</script>

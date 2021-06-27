<MainButton {disabled} label="線を引き直す" on:click="{generate}"/>
<MainButton disabled={!disabled} label="やりなおす" on:click="{reset}"/>

<script lang="ts">
    import { userList, processing } from '../../store';
    import { lineNum, amidakuji, rank, selectedUserList, disabledWriteLine, selectedNumber } from './store';
    import { generateAmidakuji, generateRandomAmidakuji, shuffleUserList } from './util';

    import MainButton from '../../parts/button/MainButton.svelte';

    // ボタン無効判定
    $: disabled = $disabledWriteLine || $userList.length === 0 || $processing

    const generate = (): void => {
        amidakuji.set(generateRandomAmidakuji($amidakuji, $lineNum));
    }

    // あみだくじの内容をリセットする
    const reset = (): void => {
        disabledWriteLine.set(false);
        selectedNumber.set([]);
        rank.set(1)
        const newAmidakuji = generateAmidakuji($userList, $lineNum);
        amidakuji.set(generateRandomAmidakuji(newAmidakuji, $lineNum));
        selectedUserList.set(shuffleUserList($userList));
    };
</script>

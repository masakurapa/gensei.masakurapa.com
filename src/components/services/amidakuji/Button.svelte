<PrimaryBtn
    size="large"
    {disabled}
    on:click="{generate}"
>線を引き直す</PrimaryBtn>
<WarningBtn
    size="midium"
    disabled={!disabled || $processing}
    on:click="{reset}"
>やりなおす</WarningBtn>

<script lang="ts">
    import { userList, processing } from '../../../store';

    import { lineNum, amidakuji, rank, selectedUserList, disabledWriteLine } from './store';
    import { generateAmidakuji, generateRandomAmidakuji, shuffleUserList } from './util';

    import PrimaryBtn from '../../parts/buttons/Primary.svelte';
    import WarningBtn from '../../parts/buttons/Warning.svelte';

    // ボタン無効判定
    $: disabled = $disabledWriteLine || $userList.length === 0 || $processing

    const generate = (): void => {
        amidakuji.set(generateRandomAmidakuji($amidakuji, $lineNum));
    }

    // あみだくじの内容をリセットする
    const reset = (): void => {
        disabledWriteLine.set(false);
        rank.set(1)
        const newAmidakuji = generateAmidakuji($userList, $lineNum);
        amidakuji.set(generateRandomAmidakuji(newAmidakuji, $lineNum));
        selectedUserList.set(shuffleUserList($userList));
    };
</script>

<CollapseFrame id="amidakuji-input" label="③あみだくじの設定をする">
    <LineNum/>
</CollapseFrame>

<script lang="ts">
    import type { UserList } from '../../../@types/user';
    import { userList } from '../../../store';
    import { lineNum, amidakuji, rank, selectedUserList, disabledWriteLine, selectedNumber } from './store';
    import { generateAmidakuji, generateRandomAmidakuji, shuffleUserList } from './util';

    import CollapseFrame from '../common/collapse/CollapseFrame.svelte';
    import LineNum from './input/LineNum.svelte';

    // あみだくじの内容をリセットする
    const reset = (value: UserList): void => {
        disabledWriteLine.set(false);
        rank.set(1);
        const newAmidakuji = generateAmidakuji(value, $lineNum);
        if (newAmidakuji.length === 0) {
            return;
        }
        amidakuji.set(generateRandomAmidakuji(newAmidakuji, $lineNum));
        selectedUserList.set(shuffleUserList(value));
    };

    lineNum.subscribe(() => {
        reset($userList);
    });

    userList.subscribe((value) => {
        reset(value);
        selectedNumber.set([]);
    });
</script>

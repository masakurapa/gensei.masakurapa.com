<Accordion id="shuffle_team" title="設定" open>
    <FormWrapper>
        <span slot="label">抽選対象</span>
        <div>
            <TextArea
                value="{inputUserList}"
                on:change={onChangeUserList}
                on:input={onInputUserList}
            />
            <div class="user_list__list_size">対象数数: {listSize}</div>
        </div>
    </FormWrapper>
    <FormWrapper>
        <span slot="label">チーム数</span>
        <Number
            value={$teamNum}
            max={maxTeamNum}
            on:change={onChangeTeamNum}
        />
    </FormWrapper>
    <FormWrapper>
        <span slot="label">人数を均等に分ける</span>
        <Checkbox
            value={true}
            on:change={onChangeEqualityFlag}
        />
    </FormWrapper>
</Accordion>

<script lang="ts">
    import type { InputEvent } from '../../../@types/event';

    import { toInt } from '../../../util';
    import {
        equalityFlag,
        teamNum,
        userList,
        resetResultUserList,
    } from './store';

    import Accordion from '../../parts/accordion/Accordion.svelte';
    import FormWrapper from '../../parts/forms/Wrapper.svelte';
    import Checkbox from '../../parts/forms/Checkbox.svelte'
    import Number from '../../parts/forms/Number.svelte'
    import TextArea from '../../parts/forms/TextArea.svelte'

    // 抽選数の最低数
    const TEAM_NUM_MIN = 1;

    // 抽選対象の変更時
    const onChangeUserList = (event: InputEvent): void => {
        const filtered = filterUserList(event.target.value);
        inputUserList = joinUserList(filtered);
        userList.set(filterUserList(event.target.value));
    };
    // 抽選対象の入力時
    const onInputUserList = (event: InputEvent): void => {
        listSize = filterUserList(event.target.value).length;
    };
    // チーム数の入力時
    const onChangeTeamNum = (event: InputEvent|any): void => {
        teamNum.set(toInt(event.detail.value));
        resetResultUserList();
    };
    // 均等分けフラグの更新時
    const onChangeEqualityFlag = (event: InputEvent|any): void => {
        equalityFlag.set(event.detail.value)
    };

    // 抽選対象の空行を取り除く
    const filterUserList = (str: string): string[] => {
        return str.trim().split(/\n/).filter((val) => val.trim() !== '');
    }
    // Convert array to string
    const joinUserList = (list: string[]): string => {
        return list.join('\n');
    }

    // ユーザーリスト更新時に設定値を再初期化
    userList.subscribe(value => {
        if (value.length === 0) {
            teamNum.set(TEAM_NUM_MIN);
            return;
        }
        teamNum.set($teamNum > value.length ? value.length : $teamNum);
    })

    let inputUserList = joinUserList($userList);
    let listSize = 0;

    // 抽選人数の最大数
    $: maxTeamNum = $userList.length > 0 ? $userList.length : TEAM_NUM_MIN;
</script>

<style>
    .user_list__list_size {
        text-align: right;
    }
</style>

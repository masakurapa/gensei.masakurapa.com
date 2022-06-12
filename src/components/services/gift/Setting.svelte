<Accordion id="gift" title="設定" open>
    <FormWrapper>
        <span slot="label">景品</span>
        <div>
            <div class="textarea_list_size">{gitfListSize}件</div>
            <TextArea
                value="{inputGitfList}"
                on:change={onChangeGiftList}
                on:input={onInputGiftList}
                {disabled}
            />
            <div class="gift_list__btn_wrapper">
                <WarningBtn
                    size="30_80"
                    fontSize="small"
                    {disabled}
                    on:click={onClickResetGiftList}
                >リセット</WarningBtn>
            </div>
        </div>
    </FormWrapper>
    <FormWrapper>
        <span slot="label">抽選対象</span>
        <div>
            <div class="textarea_list_size">{userListSize}件</div>
            <TextArea
                value="{inputUserList}"
                {disabled}
                on:change={onChangeUserList}
                on:input={onInputUserList}
            />

            <div class="user_list__btn_wrapper">
                <PrimaryBtn
                    size="30_200"
                    fontSize="small"
                    {disabled}
                    on:click={onClickSetUserList}
                >入力済みの抽選対象を使う</PrimaryBtn>
                <WarningBtn
                    size="30_80"
                    fontSize="small"
                    {disabled}
                    on:click={onClickResetUserList}
                >リセット</WarningBtn>
            </div>
        </div>
    </FormWrapper>
    <FormWrapper>
        <span slot="label">1つの対象が重複当選できる景品数</span>
        <Number
            value="{$duplicatePrizeCnt}"
            min={duplicatePrizeCntMin}
            max={duplicatePrizeCntMax}
            {disabled}
            on:change={onChangeDuplicatePrizeCnt}
        />
    </FormWrapper>
</Accordion>

<script lang="ts">
    import type { InputEvent } from '../../../@types/event';

    import { processing, userList as appUserList } from '../../../store';
    import {
        toInt,
        filterTextAreaInput,
        convertTextAreaInput
     } from '../../../util';

    import {
        giftList,
        userList,
        duplicatePrizeCnt,
        blocking,
        addCanvas,
    } from './store';

    import Accordion from '../../parts/accordion/Accordion.svelte';
    import FormWrapper from '../../parts/forms/Wrapper.svelte';
    import Number from '../../parts/forms/Number.svelte';
    import TextArea from '../../parts/forms/TextArea.svelte';
    import PrimaryBtn from '../../parts/buttons/Primary.svelte';
    import WarningBtn from '../../parts/buttons/Warning.svelte';

    // 景品の重複数の変更イベント
    // TODO: any type
    const onChangeDuplicatePrizeCnt = (event: InputEvent|any): void => {
        duplicatePrizeCnt.set(toInt(event.detail.value));
    };

    // 抽選対象の変更イベント
    const onChangeUserList = (event: InputEvent): void => {
        const filtered = filterTextAreaInput(event.target.value);
        inputUserList = convertTextAreaInput(filtered);
        userList.set(filtered);
    };
    // 抽選対象の入力イベント
    const onInputUserList = (event: InputEvent): void => {
        userListSize = filterTextAreaInput(event.target.value).length;
    };
    // 抽選対象のフォームに入力済みのユーザーリストを設定
    const onClickSetUserList = (): void => {
        const names = $appUserList.map(obj => obj.name);

        inputUserList = convertTextAreaInput(names)
        userListSize = names.length;
        userList.set(names);
    }
    // 抽選対象のクリア
    const onClickResetUserList = (): void => {
        inputUserList = '';
        userListSize = 0;
        userList.set([]);
    };

    // 景品の変更イベント
    const onChangeGiftList = (event: InputEvent): void => {
        const filtered = filterTextAreaInput(event.target.value);
        inputGitfList = convertTextAreaInput(filtered);
        giftList.set(filtered);

        for (let i = 0; i < $giftList.length; i++) {
            addCanvas();
        }
    }
    // 景品の入力イベント
    const onInputGiftList = (event: InputEvent): void => {
        gitfListSize = filterTextAreaInput(event.target.value).length;
    }
    // 景品のクリア
    const onClickResetGiftList = (): void => {
        inputGitfList = '';
        gitfListSize = 0;
        giftList.set([]);
    }

    // 抽選対象
    let inputUserList = convertTextAreaInput($userList);
    // 抽選対象数
    let userListSize = 0;
    // 景品
    let inputGitfList = convertTextAreaInput($giftList);
    // 景品数
    let gitfListSize = 0;

    // 重複抽選数の最小
    let duplicatePrizeCntMin = $duplicatePrizeCnt;
    // 重複抽選数の最大
    $: duplicatePrizeCntMax = $giftList.length > 0 ? $giftList.length : 1;
    $: {
        const uLen = $userList.length;
        const gLen = $giftList.length;
        const cnt = gLen - uLen;

        console.log(uLen, gLen, cnt, cnt % uLen);

        if (uLen === 0 || gLen <= uLen) {
            // 対象が未入力 of 景品数が対象数以下なら、最小の重複抽選件数は1
            duplicatePrizeCntMin = 1;
            duplicatePrizeCnt.set(1);
        } else {
            // 景品数が対象数より多い
            // 差分をユーザー数で割って + 1 した値の小数点を切り上げると、全ての景品が抽選可能な重複数になる
            const diffCnt = gLen - uLen;
            duplicatePrizeCntMin = Math.ceil((diffCnt / uLen) + 1);
            duplicatePrizeCnt.set(duplicatePrizeCntMin);
        }
    }

    // フォームの無効判定
    $: disabled = $processing || $blocking;
</script>

<style>
    .textarea_list_size {
        text-align: right;
    }

    .user_list__btn_wrapper {
        display: flex;
        justify-content: space-between;
    }
    .gift_list__btn_wrapper {
        display: flex;
        justify-content: end;
    }
</style>
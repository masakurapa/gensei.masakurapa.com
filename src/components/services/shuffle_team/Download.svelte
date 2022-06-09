<Accordion id="shuffle_team__download" title="抽選結果をダウンロード">
    <FormWrapper>
        <span slot="label">ファイルの形式</span>
        <Radio
            name="fileType"
            options="{fileTypes}"
            selectedValue="{fileType}"
            on:change={onChangeFileType}
        />
    </FormWrapper>
    <FormWrapper>
        <span slot="label">出力形式</span>
        <Radio
            name="outputFormatType"
            options="{outputFormatTypes}"
            selectedValue="{outputFormatType}"
            on:change={onChangeOutputFormatType}
        />
    </FormWrapper>

    <div class="download">
        <a
            class="download__btn"
            class:download__disabled="{disabled}"
            download="{downloadFileName}"
            href="/#"
            on:click="{onClickDownload}"
        >ダウンロード</a>
    </div>
</Accordion>

<script lang="ts">
    import type { InputEvent, AnchorClickEvent } from '../../../@types/event';
    import type { RadioOption } from '../../../@types/form';

    import { processing } from '../../../store';
    import { resultUserList } from './store';

    import Accordion from '../../parts/accordion/Accordion.svelte';
    import FormWrapper from '../../parts/forms/Wrapper.svelte';
    import Radio from '../../parts/forms/Radio.svelte';

    const fileTypes: RadioOption[] = [
        { value: 'csv', text: 'CSV' },
        { value: 'tsv', text: 'TSV' },
    ];
    const outputFormatTypes: RadioOption[] = [
        { value: 'vertical', text: '列ヘッダーがチーム名' },
        { value: 'horizon', text: '行ヘッダーがチーム名' },
    ];

    let fileType = 'csv';
    let outputFormatType = 'vertical';
    let downloadFileName = '';

    // ボタン無効判定
    $: disabled = $processing ||
        $resultUserList.filter(row => row.length > 0).length === 0;

    // TODO: any type
    const onClickDownload = (e: AnchorClickEvent | any): void => {
        console.log(e);
        // 区切り文字
        const sep = fileType === 'csv' ? ',' : '\t';

        if (outputFormatType === 'vertical') {
            downloadVertical(e, sep);
        } else {
            downloadHorizon(e, sep);
        }
    }

    // CSVダウンロード処理（縦並び）
    const downloadVertical = (e: AnchorClickEvent, sep: string): void => {
        const list = $resultUserList;
        let contents = '';

        // ヘッダーをチーム名で組み立てる
        let maxRow = 0;
        for (const n in list) {
            contents += `${sep}チーム` + (parseInt(n, 10) + 1);
            // ついでに最長の要素数を求めておく
            maxRow = list[n].length > maxRow ? list[n].length : maxRow;
        }
        contents = contents.slice(1);
        contents += '\n';

        for (let i = 0; i < maxRow; i++) {
            let row = '';
            for (const n in list) {
                row += sep;
                if (list[n][i] !== undefined) {
                    row += list[n][i].name;
                }
            }
            contents += row.slice(1) + '\n';
        }

        download(e, contents);
    }

    // CSVダウンロード処理（横並び）
    const downloadHorizon = (e: AnchorClickEvent, sep: string): void => {
        const list = $resultUserList;
        let contents = '';

        for (const n in list) {
            contents += 'チーム' + (parseInt(n, 10) + 1);
            for (const row of list[n]) {
                contents += `${sep}${row.name}`;
            }
            contents += '\n';
        }

        download(e, contents);
    };

    // ダウンロードの実行
    const download = (e: AnchorClickEvent, contents: string): void => {
        setFileName();
        e.currentTarget.href = URL.createObjectURL(new Blob([contents], {
            type: 'application/octet-stream',
        }));
    };

    // ファイル名を設定する
    const setFileName = (): void => {
        const jst = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
        const dt = new Date(jst);
        downloadFileName =
            `${dt.getFullYear()}` +
            `${dt.getMonth() + 1}` +
            `${dt.getDate()}` +
            `${dt.getHours()}` +
            `${dt.getMinutes()}` +
            `0${dt.getSeconds()}`.slice(-2) +
            `_suffle_team.${fileType.toLowerCase()}`;
    };

    const onChangeFileType = (event: InputEvent): void => {
        fileType = event.target.value;
    };

    const onChangeOutputFormatType = (event: InputEvent): void => {
        outputFormatType = event.target.value;
    };
</script>

<style>
    .download {
        margin-top: 20px;
        text-align: center;
    }

    .download__btn {
        display: block;
        margin:  0 auto;

        width: 200px;
        height: 40px;
        font-family: inherit;
        font-size: inherit;
        padding: 0.5em;
        box-sizing: border-box;
        border: 0.05em solid #ccc;
        border-radius: 0.25em;
        background-color: #1976d2;
        color: #FFFFFF;
        outline: none;
        cursor: pointer;
        text-decoration: none;
    }

    .download__disabled {
        background-color: #ddd !important;;
        cursor: unset;
        pointer-events: none;
    }
</style>

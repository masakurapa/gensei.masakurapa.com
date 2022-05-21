<CollapseFrame id="shuffle-team-download" label="抽選結果を出力" open={false}>
    <InputGroup label="ファイルの形式">
        <InputRadio
            name="fileType"
            options="{fileTypes}"
            selectedValue="{fileType}"
            on:change={onChangeFileType}
        ></InputRadio>
    </InputGroup>
    <InputGroup label="チームの並べ方">
        <InputRadio
            name="outputFormatType"
            options="{outputFormatTypes}"
            selectedValue="{outputFormatType}"
            on:change={onChangeOutputFormatType}
        ></InputRadio>
    </InputGroup>

    <div class="download-btn-area">
        <a
            class="download-btn"
            class:download-disabled="{disabled}"
            download="{downloadFileName}"
            href="/#"
            on:click="{onClickDownload}"
        >Download</a>
    </div>
</CollapseFrame>

<script lang="ts">
    import type { InputEvent, AnchorClickEvent } from '../../../@types/event';

    import { processing } from '../../../store';
    import { resultUserList } from './store';

    import CollapseFrame from '../common/collapse/CollapseFrame.svelte';
    import InputGroup from '../../parts/input/InputGroup.svelte';
    import InputRadio from '../../parts/input/InputRadio.svelte';

    const fileTypes = [
        { value: 'csv', text: 'CSV形式' },
        { value: 'tsv', text: 'TSV形式' },
    ];
    const outputFormatTypes = [
        { value: 'vertical', text: '縦に並べる' },
        { value: 'horizon', text: '横に並べる' },
    ];

    let fileType = 'csv';
    let outputFormatType = 'vertical';
    let downloadFileName = '';

    // ボタン無効判定
    $: disabled = $processing ||
        $resultUserList.filter(row => row.length > 0).length === 0;

    const onClickDownload = (e: AnchorClickEvent): void => {
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
            `_suffleteam_${outputFormatType}.${fileType.toLowerCase()}`;
    };

    const onChangeFileType = (event: InputEvent): void => {
        fileType = event.target.value;
    };

    const onChangeOutputFormatType = (event: InputEvent): void => {
        outputFormatType = event.target.value;
    };
</script>

<style>
    .download-btn-area {
        width: 90%;
        margin: 2em auto 0 auto;
        text-align: center;
    }
    .download-btn {
        width: 50%;
        max-width: 300px;
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
    .download-disabled {
        background-color: #ddd !important;;
        cursor: unset;
        pointer-events: none;
    }
</style>

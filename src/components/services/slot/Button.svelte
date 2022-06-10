<PrimaryBtn
    size="large"
    {disabled}
    on:click="{run}"
>スタート</PrimaryBtn>

<script lang="ts">
    import type { Canvas } from '../../../@types/canvas';

    import { userList, processing } from '../../../store';
    import { sleep, random } from '../../../util';
    import { choiceNum, canvases } from './store';

    import PrimaryBtn from '../../parts/buttons/Primary.svelte';

    $: userLength = $userList.length;
    // ボタン無効判定
    $: disabled = $userList.length === 0 || $processing;

    const scale = 40;
    const breaks = 0.003;
    const endSpeed = 0.05;
    const firstLetter = 220;
    const delay = 20;

    const run = async (): Promise<void> => {
        processing.set(true);
        selectEndpoint();

        for (let i = 0; i < $choiceNum; i++) {
            const obj = $canvases[i];
            obj.ctx = obj.canvas.getContext('2d');

            const f = firstLetter + delay * (obj.no - 1);

            obj.offsetV = (endSpeed + breaks * f);
            obj.offset = -(1 + f) * (breaks * f + 2 * endSpeed) / 2;
            obj.canvas.width = obj.canvas.clientWidth;
            obj.canvas.height = obj.canvas.clientHeight;

            requestAnimationFrame(() => slot(obj));
            await sleep(10);
        }
    };

    // 当り位置を決める
    const selectEndpoint = (): void => {
        const selected = [];
        while (selected.length < $choiceNum) {
            const no = random(userLength);
            if (selected.indexOf(no) !== -1) {
                continue;
            }
            $canvases[selected.length].end = no;
            selected.push(no);
        }
    }

    const slot = (obj: Canvas): void => {
        // 変換マトリクスを作る
        obj.ctx.setTransform(1, 0, 0, 1, 0, 0);
        // canvasをクリア
        obj.ctx.clearRect(0, 0, obj.canvas.width, obj.canvas.height);

        // スタイル設定（ぐるぐるするエリアの背景塗りつぶす）
        obj.ctx.globalAlpha = 1;
        obj.ctx.fillStyle = '#e9eefa';
        // 背景がボーダーにかぶるので横幅を左+5、右-10してる
        // 高さも微妙にずれるので5プラスしている
        obj.ctx.fillRect(5, (obj.canvas.height - scale + 5) / 2, obj.canvas.width - 10, scale);

        // 文字の色・フォントとか
        obj.ctx.fillStyle = '#000';
        obj.ctx.textBaseline = 'middle';
        obj.ctx.textAlign = 'center';

        // 変換マトリクスを作る
        obj.ctx.setTransform(1, 0, 0, 1, Math.floor(obj.canvas.width / 2), Math.floor(obj.canvas.height / 2));

        let o = obj.offset;
        while (o < 0) o++;
        o %= 1;

        const h = Math.ceil(obj.canvas.height / 2 / scale);
        for (let j = -h; j < h; j++) {
            let c = obj.end + j - Math.floor(obj.offset);
            while (c < 0) c += userLength;
            c %= userLength;

            const s = 1 - Math.abs(j + o) / (obj.canvas.height / 2 / scale + 1);
            obj.ctx.globalAlpha = s;
            obj.ctx.font = scale * s / 1.9 + 'px Helvetica';

            // テキストを描画する
            obj.ctx.fillText($userList[c].name, 0, (j + o) * scale);
        }

        obj.offset += obj.offsetV;
        obj.offsetV -= breaks;
        if (obj.offsetV < endSpeed) {
            obj.offset = 0;
            obj.offsetV = 0;

            cancelAnimationFrame(obj.frameId);
            if ($choiceNum === obj.no) {
                processing.set(false);
            }
            return;
        }

        obj.frameId = requestAnimationFrame(() => slot(obj));
    }
</script>

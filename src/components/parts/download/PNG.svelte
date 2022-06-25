<div class="wrapper">
    <PrimaryBtn
        width="middle"
        height="small"
        fontSize="small"
        on:click={download}
        {disabled}
    >
        <i class="fas fa-download"></i> PNG画像をダウンロード
    </PrimaryBtn>
</div>
<div id="download"></div>

<script lang="ts">
    import { processing } from "../../../store";

    import PrimaryBtn from "../buttons/Primary.svelte";
    import Image from "./Image.svelte";

    const ID = {
        'amidakuji': 'download-png-amidakuji',
        'gift': 'download-png-gift',
        'random': 'download-png-random',
        'team': 'download-png-team',
        'slot': 'download-png-slot',
    } as const;
    type ID_TYPE = keyof typeof ID ;

    export let id: ID_TYPE;

    let downloading = false;
    $: disabled = $processing || downloading;

    const download = async () => {
        downloading = true;

        const jst = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
        const dt = new Date(jst);
        const fileName =
            `${dt.getFullYear()}` +
            `${dt.getMonth() + 1}` +
            `${dt.getDate()}` +
            `${dt.getHours()}` +
            `${dt.getMinutes()}` +
            `0${dt.getSeconds()}`.slice(-2) +
            `_${id}.png`;

        const app = new Image({
            target: document.getElementById('download'),
            props: {
                id: ID[id],
                fileName,
            },
        });
        await app.exec();
        app.$destroy();

        downloading = false;
    };
</script>

<style>
    .wrapper {
        width: 100%;
        max-width: 900px;
        text-align: right;
        margin: 28px 0;
    }
</style>

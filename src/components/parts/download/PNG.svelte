<button
    on:click={download}
    {disabled}
>
    <i class="fas fa-download"></i> 結果を保存
</button>
<div id="download"></div>

<script lang="ts">
    import { processing } from "../../../store";
    import Image from "./Image.svelte";

    export let id: string;

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
            props: { id, fileName },
        });
        await app.exec();
        app.$destroy();

        downloading = false;
    };
</script>

<style>
    button {
        height: 36px;
        width: 160px;
        font-family: inherit;
        font-size: small;
        padding: 0.5em;
        box-sizing: border-box;
        border: 0.05em solid #ccc;
        border-radius: 0.25em;
        background-color: #1976d2;
        color: #FFFFFF;
        outline: none;
        cursor: pointer;
    }
    button:disabled {
        background-color: #ddd !important;
        cursor: unset;
    }
    button:focus {
        border-color: #666;
    }
</style>

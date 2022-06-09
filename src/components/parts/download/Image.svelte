<a
    bind:this={downloadBtn}
    href="/#"
    hidden
>ダウンロード</a>

<script lang="ts">
    import domtoimage from 'dom-to-image';

    export let id: string;
    export let fileName: string;

    let downloadBtn: any;

    export const exec = async (): Promise<void> => {
        const node = document.getElementById(`download-${id}`);
        const dataUrl = await domtoimage.toPng(node, {
            // width/heightはスクロールを含めた高さに + マージン分を取る
            width: node.scrollWidth + 32,
            height: node.scrollHeight + 64,
            bgcolor: '#FFFFFF',
            style: { margin: '32px 16px' },
        });
        downloadBtn.download = fileName;
        downloadBtn.href = dataUrl;
        downloadBtn.click();
    };
</script>

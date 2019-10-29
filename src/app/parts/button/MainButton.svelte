<div class="btn-area">
    <button {disabled} style={getBtnStyle()} on:click>
        {label}
    </button>
</div>

<script>
    // 呼び出し元からボタンを無効にするためのフラグ
    export let disabled = false
    // 通常のボタンテキスト
    export let label = 'BUTTON!!'
    // ボタンのクラス
    export let btnStyle = {}

    function getBtnStyle () {
        const styles = []
        for (const key in btnStyle) {
            styles.push(`${key}: ${btnStyle[key]};`)
        }
        return styles
    }
</script>

<style>
    .btn-area {
        width: 90%;
        margin: 0 auto;
        margin-top: 1em;
        text-align: center;
        display: flexbox;
    }
    button {
        width: 50%;
        max-width: 300px;
        font-family: inherit;
        font-size: inherit;
        padding: 0.5em;
        box-sizing: border-box;
        border: 0.05em solid #ccc;
        border-radius: 0.25em;
        background-color: #1976d2 !important;
        color: #FFFFFF;
        outline: none;
        cursor: pointer;
    }
    button:disabled {
        background-color: #ddd !important;;
        cursor: unset;
    }
    button:focus {
        border-color: #666;
    }
</style>

<div class="wrapper">
    <h2>概要</h2>
    <div class="description">
        <div>ちょっとしたこと、なかなか決められないことなどなど...ツールでサクッと決めちゃいましょう！</div>
        <div>ランダムで選ぶだけではなく、あみだくじ、スロット形式で気分を変えながら抽選ができます！</div>
        <div>その他チーム分けや景品の抽選も行うことができます！</div>
        <div class="separate"></div>
        <div>※本サービスはローカルストレージを使用します。プライベートモードでは抽選対象の保存は動作しませんのでご注意ください。</div>
    </div>
</div>

<h2 class="services">機能一覧</h2>

<div class="wrapper">
    <h3>あみだくじ</h3>
    <div class="description">
        <div>横線はクリックすることで線を削除したり追加したりすることができます。</div>
    </div>
</div>
<div class="wrapper">
    <h3>ランダム</h3>
    <div class="description">
        <div>抽選対象から <span class="code">Math.floor(Math.random() * n)</span> で選択しています。</div>
        <div>選ばれた感を出すためにランダムで1回選ばれたらではなく最初に規定回数(10,000回)に到達した対象を選択しています。</div>
    </div>
</div>
<div class="wrapper">
    <h3>スロット</h3>
    <div class="description">
        <div>スロットっぽい見た目で抽選ができます。</div>
        <div>PCのスペック次第では対象が多すぎるとカクつくかもしれません。</div>
    </div>
</div>
<div class="wrapper">
    <h3>チーム分け</h3>
    <div class="description">
        <div>テキストエリアに入力された対象をランダムでチーム分けします。</div>
        <div><span class="bold">入力済みの抽選対象を使う</span>ボタンを押すと、あみだくじ等の機能で設定した抽選対象がテキストエリアに設定されます。</div>
    </div>
</div>
<div class="wrapper">
    <h3>景品を抽選</h3>
    <div class="description">
        <div>スロットっぽい見た目で景品の抽選ができます。</div>
        <div><span class="bold">入力済みの抽選対象を使う</span>ボタンを押すと、あみだくじ等の機能で設定した抽選対象がテキストエリアに設定されます。</div>
    </div>
</div>

<script lang="ts">
    import { onMount } from "svelte";
    import { setSkipAbort } from "../../../storage";

    onMount(() => {
        // 一度説明表示したユーザーは次回以降スキップさせたいので、フラグを保存しておく
        setSkipAbort();
    });
</script>

<style>
    h2 {
        margin: 0;
    }
    h3 {
        margin: 0;
    }

    .wrapper {
        margin-bottom: 32px;
    }
    .description {
        text-indent: 1em;
    }

    .services {
        margin-bottom: 16px;
    }

    .separate {
        margin-bottom: 16px;
    }

    .code {
        background-color: #EEE;
        font-style: italic;
        border-radius: 8px;
        padding: 0.2em 0.4em
    }
    .bold {
        font-weight: bold;
    }
</style>

import { random, randomOdd } from 'app/util'

export const flags = {
    off: 0,
    on: 1,
    none: 2,
}

// あみだくじを作る
export const generateAmidakuji = (userList, lineNum) => {
    const amidakuji = []

    const vertical = userList.length
    if (vertical === 0) {
        return amidakuji
    }

    const vn = vertical + (vertical - 1)

    // 一番下に余白用の行を付けたいので横線を引く行数 + 1回処理する
    for (let h = 0; h < lineNum + 1; h++) {
        amidakuji[h] = []
        for (let v = 0; v < vn; v++) {
            const horizonFlag = h === lineNum ? flags.none : flags.off
            amidakuji[h][v] = getRowObject(isHorizon(v) ? horizonFlag : flags.on)
        }
    }

    return amidakuji
}

// ランダムで横線を引く
export const generateRandomAmidakuji = (amidakuji, userList, lineNum) => {
    const vertical = userList.length

    // 横線を全部初期化する
    for (let h = 0; h < amidakuji.length - 1; h++) {
        for (let v = 1; v < amidakuji[h].length; v += 2) {
            amidakuji[h][v].flag = flags.off
        }
    }
    clearActiveLine(amidakuji)

    const vn = vertical - 1
    let num = Math.ceil((lineNum * vn) / 3)
    while (num > 0) {
        const h = random(lineNum)
        const v = randomOdd(amidakuji[0].length - 1)
        if (amidakuji[h][v].flag !== flags.off) {
            continue
        }
        writeHrizon(amidakuji, h, v)
        num--
    }

    return amidakuji
}

// ユーザー情報をシャッフルして並び替えておく
export const shuffleUserList = (userList) => {
    const selectedUserList = userList.map((item) => {
        return {
            name: item.name, // 表示名
            rank: 0, // 何番目に選ばれたか
        }
    })

    // あとあと計算が楽なので使わないけど横線分のデータも入れておく
    for (var i = selectedUserList.length - 1; i > 0; i--) {
        var r = random(i + 1)
        var tmp = selectedUserList[i]
        selectedUserList[i] = selectedUserList[r]
        selectedUserList[r] = tmp
    }

    return selectedUserList
}

// あみだくじを作るためのオブジェクト
export const getRowObject = (flag) => {
    return {
        flag, // 線の種別
        size: 0, // background-colorのwidth/heightの割合
        active: false, // 通った道
        rivers: false, // 右から左に線を移動するためのフラグ
    }
}

// 横線か判定する（偶数列: 縦線, 奇数列: 横線）
export const isHorizon = (i) => {
    return i % 2 === 1
}

// アクティブな線を元に戻す
export const clearActiveLine = (amidakuji) => {
    for (let h = 0; h < amidakuji.length; h++) {
        for (let v = 0; v < amidakuji[h].length; v++) {
            if (amidakuji[h][v].active) {
                amidakuji[h][v] = getRowObject(flags.on)
            }
        }
    }
    return amidakuji
}

// 未選択の線を非表示にする
export const hideUnselectedLine = (amidakuji) => {
    for (let h = 0; h < amidakuji.length; h++) {
        for (let v = 0; v < amidakuji[h].length; v++) {
            if (amidakuji[h][v].flag === flags.off) {
                amidakuji[h][v] = getRowObject(flags.none)
            }
        }
    }
    return amidakuji
}

// 指定位置に線を引く
export const writeHrizon = (amidakuji, h, v) => {
    const writeSideLine = (h, v, pos, enabled) => {
        const pos1 = v + pos
        // 指定の場所に線がなければ無視
        if (amidakuji[h][pos1] === undefined) {
            return
        }

        // 線を消す時は既に入っている値は気にしない
        if (!enabled) {
            amidakuji[h][pos1].flag = flags.none
            return
        }

        // 線を表示する時は、更に隣に線が引かれてないときだけ
        const row2 = amidakuji[h][pos1 + pos]
        if (row2 === undefined || row2.flag !== flags.on) {
            amidakuji[h][pos1].flag = flags.off
        }
    }

    const val = amidakuji[h][v].flag === flags.on ? flags.off : flags.on
    amidakuji[h][v].flag = val
    // 左側
    writeSideLine(h, v, -2, val === flags.off)
    // 右側
    writeSideLine(h, v, 2, val === flags.off)

    return amidakuji
}

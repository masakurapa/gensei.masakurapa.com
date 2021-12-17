import { Flag } from '../../@types/amidakuji';
import type { Amidakuji, Line } from '../../@types/amidakuji';
import type { UserList, AmidakujiUserList } from '../../@types/user';
import { random, randomOdd } from '../../util';

// あみだくじを作る
export const generateAmidakuji = (userList: UserList, lineNum: number): Amidakuji => {
    const amidakuji = [];

    const vertical = userList.length;
    if (vertical === 0) {
        return amidakuji;
    }

    const vn = vertical + (vertical - 1);

    // 一番下に余白用の行を付けたいので横線を引く行数 + 1回処理する
    for (let h = 0; h < lineNum + 1; h++) {
        amidakuji[h] = [];
        for (let v = 0; v < vn; v++) {
            const horizonFlag = h === lineNum ? Flag.NONE : Flag.OFF;
            amidakuji[h][v] = getRowObject(isHorizon(v) ? horizonFlag : Flag.ON);
        }
    }

    return amidakuji;
}

/**
 * ランダムで横線を引く
 */
export const generateRandomAmidakuji = (amidakuji: Amidakuji, lineNum: number): Amidakuji => {
    // 横線を全部初期化する
    for (let h = 0; h < amidakuji.length - 1; h++) {
        for (let v = 1; v < amidakuji[h].length; v += 2) {
            amidakuji[h][v].flag = Flag.OFF;
        }
    }
    clearActiveLine(amidakuji);

    // 全行に引けるだけの線を引く
    for (let h = 0; h < lineNum; h++) {
        while (amidakuji[h].filter(v => v.flag === Flag.OFF).length > 0) {
            const v = randomOdd(amidakuji[0].length - 1);
            if (amidakuji[h][v].flag !== Flag.OFF) {
                continue;
            }
            writeHrizon(amidakuji, h, v);
        }
    }

    return amidakuji;
}

/**
 * ユーザー情報をシャッフルして並び替えておく
 */
export const shuffleUserList = (userList: UserList): AmidakujiUserList => {
    const selectedUserList = userList.map((item) => {
        return {
            id: item.id,
            name: item.name,
            rank: 0, // 何番目に選ばれたか
        };
    });

    // あとあと計算が楽なので使わないけど横線分のデータも入れておく
    for (var i = selectedUserList.length - 1; i > 0; i--) {
        var r = random(i + 1);
        var tmp = selectedUserList[i];
        selectedUserList[i] = selectedUserList[r];
        selectedUserList[r] = tmp;
    }

    return selectedUserList;
}

/**
 * あみだくじを作るためのオブジェクト
 */
export const getRowObject = (flag: Flag): Line => {
    return {
        flag,
        size: 0,
        active: false,
        rivers: false,
    }
}

/**
 * 横線か判定する（偶数列: 縦線, 奇数列: 横線）
 */
export const isHorizon = (i: number): boolean => {
    return i % 2 === 1;
}

/**
 * アクティブな線を元に戻す
 */
export const clearActiveLine = (amidakuji: Amidakuji): Amidakuji => {
    for (let h = 0; h < amidakuji.length; h++) {
        for (let v = 0; v < amidakuji[h].length; v++) {
            if (amidakuji[h][v].active) {
                amidakuji[h][v] = getRowObject(Flag.ON);
            }
        }
    }
    return amidakuji;
}

/**
 * 未選択の線を非表示にする
 */
export const hideUnselectedLine = (amidakuji: Amidakuji): Amidakuji => {
    for (let h = 0; h < amidakuji.length; h++) {
        for (let v = 0; v < amidakuji[h].length; v++) {
            if (amidakuji[h][v].flag === Flag.OFF) {
                amidakuji[h][v] = getRowObject(Flag.NONE);
            }
        }
    }
    return amidakuji;
}

/**
 * 指定位置に線を引く
 */
export const writeHrizon = (amidakuji: Amidakuji, h: number, v: number): Amidakuji => {
    const writeSideLine = (h: number, v: number, pos: number, enabled: boolean) => {
        const pos1 = v + pos;
        // 指定の場所に線がなければ無視
        if (amidakuji[h][pos1] === undefined) {
            return;
        }

        // 線を消す時は既に入っている値は気にしない
        if (!enabled) {
            amidakuji[h][pos1].flag = Flag.NONE;
            return;
        }

        // 線を表示する時は、更に隣に線が引かれてないときだけ
        const row2 = amidakuji[h][pos1 + pos];
        if (row2 === undefined || row2.flag !== Flag.ON) {
            amidakuji[h][pos1].flag = Flag.OFF;
        }
    }

    const val = amidakuji[h][v].flag === Flag.ON ? Flag.OFF : Flag.ON;
    amidakuji[h][v].flag = val;
    // 左側
    writeSideLine(h, v, -2, val === Flag.OFF);
    // 右側
    writeSideLine(h, v, 2, val === Flag.OFF);

    return amidakuji;
}

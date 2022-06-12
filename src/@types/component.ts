/**
 * 抽選方法のコンポーネント情報
 */
export interface Component {
    value: string;
    text: string;
    useSp?: boolean; // TODO: 削除
    component?: any; // TODO: 必須にする
    clickable?: boolean // TODO: 必須にする
};

/**
 * 抽選方法のコンポーネントのリスト
 */
export type ComponentList = Component[];

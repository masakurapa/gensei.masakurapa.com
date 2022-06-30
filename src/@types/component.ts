/**
 * 抽選方法のコンポーネント情報
 */
export interface Component {
    value: string;
    text: string;
    component?: any;
};

/**
 * 抽選方法のコンポーネントのリスト
 */
export type ComponentList = Component[];

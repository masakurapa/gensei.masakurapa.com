/**
 * on:xxxでの入力イベント
 */
export interface InputEvent extends FocusEvent {
    target: HTMLInputElement;
};

/**
 * キーボード操作のイベント
 */
export interface KeyEvent extends KeyboardEvent {
    target: HTMLInputElement;
}

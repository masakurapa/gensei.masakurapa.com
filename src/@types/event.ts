/**
 * on:xxxでの入力イベント
 */
export interface InputEvent extends FocusEvent {
    target: HTMLInputElement;
};

/**
 * 指定された DOM 要素内に新たな JSCAD インスタンスを作成します。
 *
 * @param targetElement - JSCAD インスタンスを生成する対象の DOM 要素。
 * @param options - インスタンス生成時のオプション設定。
 * @returns パラメータ更新用のコールバック関数を返す Promise。
 *
 * @example
 * ```ts
 * import makeJscad = require('@jscad/web');
 *
 * const container = document.getElementById('viewer');
 * makeJscad(container!, { name: 'myJscad', logging: true })
 *   .then(updateParams => {
 *     // updateParams を利用してパラメータ更新が可能
 *     updateParams({ someParam: 123 });
 *   });
 * ```
 */
declare function makeJscad(
  targetElement: HTMLElement,
  options?: makeJscad.JscadOptions
): Promise<makeJscad.UpdateParamsCallback>;

declare namespace makeJscad {
  /**
   * インスタンス生成時のオプション設定
   */
  export interface JscadOptions {
    /**
     * インスタンスの一意な名前。
     * 同じ名前を再利用すると意図しない挙動になる可能性があります。
     * @default "jscad"
     */
    name?: string;
    /**
     * ロギングを有効にするかどうか。
     * @default false
     */
    logging?: boolean;
  }

  /**
   * パラメータ更新用のコールバック関数。
   * この関数を呼び出すことで、JSCAD インスタンスのパラメータを更新できます。
   *
   * @param params 任意のパラメータ（詳細な型は必要に応じて変更してください）
   */
  export type UpdateParamsCallback = (params: any) => void;
}

export = makeJscad;

/// <reference types="node" />
declare module '@jscad/web' {
  export interface JscadOptions {
    name?: string;
    logging?: boolean;
  }

  export type UpdateParamsCallback = (params: unknown) => void;

  export function createRoot(
    container: HTMLElement,
    options?: JscadOptions
  ): Promise<UpdateParamsCallback>;
}

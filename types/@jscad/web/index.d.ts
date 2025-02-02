/// <reference types="node" />
declare module '@jscad/web' {
  interface JscadOptions {
    name?: string;
    logging?: boolean;
  }

  type UpdateParamsCallback = (params: unknown) => void;

  function jscadWeb(
    container: HTMLElement,
    options?: JscadOptions
  ): Promise<UpdateParamsCallback>;

  export default jscadWeb;
}

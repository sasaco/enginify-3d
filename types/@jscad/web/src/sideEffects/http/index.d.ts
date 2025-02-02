export = makeHttpSideEffect;
/**
 * Create the http side effect (sink)
 * NOTE: we could add 'adaptors' to specific API providers like github as input to this
 * function in order to be able to read remote files without the need to proxy with a server
 */
declare function makeHttpSideEffect(params: any): {
    source: () => import("most").Stream<any>;
    sink: (out$: any) => void;
};

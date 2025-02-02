export = makeDatSideEffect;
declare function makeDatSideEffect(params: any): Promise<{
    source: () => import("most").Stream<any>;
    sink: (commands$: any) => void;
}>;

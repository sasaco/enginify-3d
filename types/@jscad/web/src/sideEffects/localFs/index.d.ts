export = makeLocalFsSideEffect;
declare function makeLocalFsSideEffect(params: any): Promise<{
    source: () => import("most").Stream<any>;
    sink: (commands$: any) => void;
}>;

export = makeStorageSideEffect;
declare function makeStorageSideEffect({ name }: {
    name: any;
}): {
    sink: (outToStore$: any) => void;
    source: () => import("most").Stream<any>;
};

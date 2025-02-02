export = makei18nSideEffect;
declare function makei18nSideEffect(options: any): {
    sink: (out$: any) => void;
    source: () => import("most").Stream<any>;
};

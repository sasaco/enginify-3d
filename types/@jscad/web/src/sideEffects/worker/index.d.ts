export = makeWorkerEffect;
declare function makeWorkerEffect(workerPath: any): {
    sink: (outToWorker$: any) => void;
    source: () => import("most").Stream<any>;
};

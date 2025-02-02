export let callbackToObservable: () => {
    stream: import("most").Stream<any>;
    callback: (externalData: any) => void;
};
export let delayFromObservable: (mapper: any, stateStream: any) => (stream: any) => import("most").Stream<any>;
export let holdUntil: (startSignal: any) => (stream: any) => any;
export let withLatestFrom: (fn: any, stream: any) => (sampleStream: any) => import("most").Stream<any>;

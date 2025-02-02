export = callBackToStream;
declare function callBackToStream(): {
    stream: import("most").Stream<any>;
    callback: (externalData: any) => void;
};

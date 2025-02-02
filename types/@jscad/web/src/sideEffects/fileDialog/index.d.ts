export = makeFileDialog;
declare function makeFileDialog(params: any): {
    source: () => void;
    sink: (out$: any) => void;
};

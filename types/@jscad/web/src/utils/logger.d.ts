export = makeLogger;
declare function makeLogger(params: any): {
    debug: (...params: any[]) => void;
    info: any;
    warning: (...params: any[]) => void;
    error: (...params: any[]) => void;
};

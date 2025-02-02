export = makeState;
declare function makeState(params: any): {
    source: () => most.Stream<{
        appTitle: string;
        activeTool: any;
        status: {
            message: string;
            error: any;
            busy: boolean;
        };
        shortcuts: any;
        storage: {
            path: string;
        };
        version: any;
    }>;
    sink: (out$: any) => void;
};
import most = require("most");

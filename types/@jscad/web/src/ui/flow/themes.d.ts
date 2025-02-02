export = actions;
declare function actions({ sources }: {
    sources: any;
}): {
    initialize$: most.Stream<{
        type: string;
        sink: string;
    } & {
        state: any;
    }>;
    setTheme$: most.Stream<{
        type: string;
        sink: string;
    } & {
        state: any;
    }>;
    requestLoadSettings$: most.Stream<{
        sink: string;
        key: string;
        type: string;
    }>;
    requestSaveSettings$: any;
};
import most = require("most");

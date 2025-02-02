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
    setShortcut$: most.Stream<{
        type: string;
        state: any;
        sink: string;
    }>;
    setShortcuts$: most.Stream<{
        type: string;
        sink: string;
    } & {
        state: any;
    }>;
    triggerFromShortcut$: any;
    requestLoadSettings$: most.Stream<{
        sink: string;
        key: string;
        type: string;
    }>;
    requestSaveSettings$: any;
};
import most = require("most");

export = actions;
declare function actions({ sources }: {
    sources: any;
}): {
    initializeExports$: most.Stream<{
        type: string;
        sink: string;
    } & {
        state: any;
    }>;
    requestExport$: any;
    changeExportFormat$: any;
};
import most = require("most");

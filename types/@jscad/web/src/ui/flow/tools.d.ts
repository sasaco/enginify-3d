export = actions;
declare function actions({ sources }: {
    sources: any;
}): {
    setActiveTool$: most.Stream<{
        type: string;
        sink: string;
    } & {
        state: any;
    }>;
};
import most = require("most");

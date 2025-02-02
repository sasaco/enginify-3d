export = actions;
declare function actions({ sources }: {
    sources: any;
}): {
    setErrors$: most.Stream<{
        type: string;
        sink: string;
    } & {
        state: any;
    }>;
    clearErrors$: most.Stream<{
        type: string;
        sink: string;
    } & {
        state: any;
    }>;
};
import most = require("most");

export = actions;
declare function actions({ sources }: {
    sources: any;
}): {
    initializeViewer$: most.Stream<{
        type: string;
        sink: string;
    } & {
        state: any;
    }>;
    toggleGrid$: most.Stream<{
        type: string;
        state: any;
        sink: string;
    }>;
    toggleAxes$: most.Stream<{
        type: string;
        state: any;
        sink: string;
    }>;
    toggleAutoRotate$: most.Stream<{
        type: string;
        state: any;
        sink: string;
    }>;
    toggleAutoZoom$: most.Stream<{
        type: string;
        state: any;
        sink: string;
    }>;
    otherViewerActions$: any;
};
import most = require("most");

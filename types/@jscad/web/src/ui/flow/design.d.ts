export = actions;
declare function actions({ sources }: {
    sources: any;
}): {
    initialize$: most.Stream<{
        type: string;
        state: any;
        sink: string;
    }>;
    requestLoadDesignContent$: any;
    requestWatchDesign$: most.Stream<any>;
    requestWriteCachedGeometry$: most.Stream<any>;
    resetDesign$: most.Stream<{
        type: string;
        state: any;
        sink: string;
    }>;
    setDesignContent$: most.Stream<{
        type: string;
        state: any;
        sink: string;
    }>;
    setDesignSolids$: most.Stream<{
        type: string;
        state: any;
        sink: string;
    }>;
    setDesignParameterDefinitions$: any;
    setDesignParameterValues$: any;
    reportErrorsFromWorker$: most.Stream<any>;
    requestGeometryRecompute$: any;
    timeoutGeometryRecompute$: any;
    cancelGeometryRecompute$: any;
    requestLoadSettings$: most.Stream<{
        sink: string;
        key: string;
        type: string;
    }>;
    requestSaveSettings$: any;
    setDesignSettings$: any;
    toggleAutoReload$: most.Stream<{
        type: string;
        state: any;
        sink: string;
    }>;
    toggleInstantUpdate$: most.Stream<{
        type: string;
        state: any;
        sink: string;
    }>;
    toggleVTreeMode$: most.Stream<{
        type: string;
        state: any;
        sink: string;
    }>;
    setSolidsTimeout$: most.Stream<{
        type: string;
        state: any;
        sink: string;
    }>;
};
import most = require("most");

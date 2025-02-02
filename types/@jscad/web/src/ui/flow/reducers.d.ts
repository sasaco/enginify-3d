export function initialize(): any;
export function resetDesign(state: any, origin: string): any;
export function setDesignContent(state: any, payload: string): any;
export function setDesignSolids(state: any, { solids, lookup, lookupCounts }: {
    solids: any[];
    lookup: any;
    lookupCounts: any;
}): any;
export function setDesignParameterDefinitions(state: any, data: any): {
    design: any;
};
export function setDesignParameterValues(state: any, data: any): any;
export function setSettings(state: any, { data }: {
    data: any;
}): {
    design: any;
};
export function requestGeometryRecompute({ design }: {
    design: any;
}, _: any): any;
export function timeoutGeometryRecompute({ status }: {
    status: any;
}, _: any): any;
export function requestWriteCachedGeometry({ design }: {
    design: any;
}, cache: any): {
    path: string;
    options: {
        isRawData: boolean;
    };
    origin: any;
};
export function requestSaveSettings({ design }: {
    design: any;
}): any;
export function isDesignValid(state: any): boolean;
export function isDesignTheSame(previousState: any, state: any): boolean;
export function isDesignTheSameForSerialization(previousState: any, state: any): boolean;
export function toggleAutoReload(state: any, autoReload: any): {
    design: any;
};
export function toggleInstantUpdate(state: any, instantUpdate: any): {
    design: any;
};
export function toggleVtreeMode(state: any, vtreeMode: any): {
    design: any;
};
export function setSolidsTimeout(state: any, solidsTimeOut: any): {
    design: any;
};

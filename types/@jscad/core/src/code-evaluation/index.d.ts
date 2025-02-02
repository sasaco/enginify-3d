export let rebuildGeometry: (data: {
    filesAndFolders: any[];
    mainPath?: string;
    serialize?: boolean;
    lookup?: any;
    lookupCounts?: any;
    parameterValues?: any;
}, callback: Function) => void;
export let rebuildGeometryCli: (data: any) => any;
export let rebuildGeometryWorker: (self: any) => void;
export let serializeSolids: (solids: any) => any;

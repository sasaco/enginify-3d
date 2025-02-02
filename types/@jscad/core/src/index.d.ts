export let evaluation: {
    rebuildGeometry: (data: {
        filesAndFolders: any[];
        mainPath?: string;
        serialize?: boolean;
        lookup?: any;
        lookupCounts?: any;
        parameterValues?: any;
    }, callback: Function) => void;
    rebuildGeometryCli: (data: any) => any;
    rebuildGeometryWorker: (self: any) => void;
    serializeSolids: (solids: any) => any;
};
export let io: {
    registerAllExtensions: any;
    unRegisterAllExtensions: any;
};
export let loading: {
    makeFakeFs: (filesAndFolders: any) => {
        statSync: (path: any) => {
            isFile: (_: any) => boolean;
            isDirectory: (_: any) => boolean;
        };
        existsSync: (path: any) => boolean;
        readdirSync: (path: any) => any;
        readDir: (path: any, callback: any) => void;
        readFile: (path: any, encoding: any, callback: any) => void;
        readFileSync: (path: any, encoding: any) => any;
    };
    requireDesignUtilsFs: typeof import("@jscad/core/src/code-loading/requireDesignUtilsFs");
};
export let parameters: {
    applyParameterDefinitions: (inputParameters: any, parameterDefinitions: any[], throwOnNoDefinition?: boolean) => any;
    getParameterDefinitionsAndValues: (rootModule: Module, overrides: any) => any;
    getParameterValuesFromParameters: (parameterDefinitions: any, inputParameters: any) => {};
    getParameterValuesFromUIControls: (paramControls: any[], parameterDefinitions: any, onlyChanged: boolean) => any;
};
export let utils: {
    getFileExtensionFromString: (input: any) => any;
    version: typeof import("@jscad/core/src/utils/version");
};
export let web: {
    walkFileTree: (fileList: any) => Promise<any[]>;
};

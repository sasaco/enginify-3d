export let makeFakeFs: (filesAndFolders: any) => {
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
export let requireDesignUtilsFs: typeof import("@jscad/core/src/code-loading/requireDesignUtilsFs.js");

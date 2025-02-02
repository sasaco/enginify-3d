export let prepareRender: (params: any) => (data: any) => void;
export namespace drawCommands {
    let drawGrid: (regl: any, params: any) => (props: any) => void;
    let drawAxis: (regl: any, params: any) => (props: any) => any;
    let drawMesh: (regl: any, params?: {
        extras: {};
    }) => any;
    let drawLines: (regl: any, params?: {}) => any;
}
export namespace cameras {
    let camera: typeof import("@jscad/regl-renderer/src/cameras/camera");
    let orthographic: typeof import("@jscad/regl-renderer/src/cameras/orthographicCamera");
    let perspective: typeof import("@jscad/regl-renderer/src/cameras/perspectiveCamera");
}
export namespace controls {
    let orbit: typeof import("@jscad/regl-renderer/src/controls/orbitControls");
}
export let entitiesFromSolids: (options: {
    color?: any[];
    smoothNormals?: boolean;
}, ...solids: any[]) => any[];

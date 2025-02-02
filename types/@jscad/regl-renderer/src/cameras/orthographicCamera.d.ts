export namespace cameraState {
    let view: any;
    let projection: any;
    let matrix: any;
    let near: number;
    let far: number;
    let up: number[];
    let eye: Float32Array;
    let position: number[];
    let target: number[];
    let fov: number;
    let aspect: number;
    let viewport: number[];
    let zoom: number;
    let projectionType: string;
}
export const cameraProps: {};
export function setProjection(camera: any, input: any): {
    projection: any;
    aspect: number;
    viewport: any[];
};

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
    let projectionType: string;
}
export const cameraProps: {};
export namespace defaults { }
export function setProjection(output: any, camera: any, input: any): any;
export function update(output: any, camera: any): any;

export let create: () => {
    point: vec3.Vec3;
    axis: vec3.Vec3;
    normal: vec3.Vec3;
};
export let fromPointAxisNormal: (point: typeof vec3, axis: typeof vec3, normal: typeof vec3) => {
    point: vec3.Vec3;
    axis: vec3.Vec3;
    normal: vec3.Vec3;
};
export let toString: (connector: any) => string;
export let transform: (matrix: typeof mat4, connector: any) => any;
export let transformationBetween: (options: {
    mirror?: boolean;
    normalRotation?: number;
}, from: connector, to: connector) => typeof mat4;

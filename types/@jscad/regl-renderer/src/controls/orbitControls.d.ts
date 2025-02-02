export namespace controlsProps {
    namespace limits {
        let minDistance: number;
        let maxDistance: number;
    }
    let drag: number;
    let EPS: number;
    namespace zoomToFit {
        let auto: boolean;
        let targets: string;
        let tightness: number;
    }
    namespace userControl {
        let zoom: boolean;
        let zoomSpeed: number;
        let rotate: boolean;
        let rotateSpeed: number;
        let pan: boolean;
        let panSpeed: number;
    }
    namespace autoRotate {
        let enabled: boolean;
        let speed: number;
    }
    let autoAdjustPlanes: boolean;
}
export namespace controlsState {
    let thetaDelta: number;
    let phiDelta: number;
    let scale: number;
}
export const defaults: {
    thetaDelta: number;
    phiDelta: number;
    scale: number;
} & {
    limits: {
        minDistance: number;
        maxDistance: number;
    };
    drag: number;
    EPS: number;
    zoomToFit: {
        auto: boolean;
        targets: string;
        tightness: number;
    };
    userControl: {
        zoom: boolean;
        zoomSpeed: number;
        rotate: boolean;
        rotateSpeed: number;
        pan: boolean;
        panSpeed: number;
    };
    autoRotate: {
        enabled: boolean;
        speed: number;
    };
    autoAdjustPlanes: boolean;
};
export function update({ controls, camera }: {
    controls: any;
    camera: any;
}, output: any): {
    controls: {
        thetaDelta: number;
        phiDelta: number;
        scale: number;
        changed: boolean;
    };
    camera: {
        position: any;
        view: any;
    };
};
/**
  * compute camera state to rotate the camera
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Float} angle value of the angle to rotate
  * @return {Object} the updated camera data/state
*/
export function rotate({ controls, camera, speed }: any, angle: Float): any;
/**
  * compute camera state to zoom the camera
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Float} zoomDelta value of the zoom
  * @return {Object} the updated camera data/state
*/
export function zoom({ controls, camera, speed }: any, zoomDelta?: Float): any;
/**
  * compute camera state to pan the camera
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Float} delta value of the raw pan delta
  * @return {Object} the updated camera data/state
*/
export function pan({ controls, camera, speed }: any, delta: Float): any;
/**
  * compute camera state to 'fit' an object on screen
  * Note1: this is a non optimal but fast & easy implementation
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Array} entities - an array of entities (see entitiesFromSolids)
  * @return {Object} the updated camera data/state
*/
export function zoomToFit({ controls, camera, entities }: any): any;
/**
  * compute controls state to 'reset it' to the given state
  * Note1: this is a non optimal but fast & easy implementation
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Object} desiredState the state to reset the camera to: defaults to default values
  * @return {Object} the updated camera data/state
*/
export function reset({ controls, camera }: any, desiredState: any): any;

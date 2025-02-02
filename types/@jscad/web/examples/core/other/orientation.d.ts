/**
 * Demonstration of three-dimensional coordinate system, and rotations about X, Y and Z axis.
 * @param {Number} params.rotateX - Rotation (degrees) about the X axis
 * @param {Number} params.rotateY - Rotation (degrees) about the Y axis
 * @param {Number} params.rotateZ - Rotation (degrees) about the Z axis
 * @returns {geometries}
 */
export function main(params: any): typeof jscad.geometries;
export function getParameterDefinitions(): ({
    name: string;
    type: string;
    caption: string;
    title?: undefined;
    initial?: undefined;
    min?: undefined;
    max?: undefined;
} | {
    name: string;
    type: string;
    caption: string;
    title: string;
    initial: number;
    min: number;
    max: number;
})[];
import jscad = require("@jscad/modeling");

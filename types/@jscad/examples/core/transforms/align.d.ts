/**
 * Generates a series of boxes of various sizes, and uses the align function to align them in different ways.
 * @param {Boolean} params.grouped - Treat all objects as a single object.
 * @param {String} params.modes - How to treat alignment on each axis.
 * @param {String} params.relativeTo - The relative point to align geometries. Null to use the group's bounding box.
 * @returns {geometry}
 */
export function main(params: any): geometry;
export function getParameterDefinitions(): ({
    name: string;
    type: string;
    checked: boolean;
    caption: string;
    values?: undefined;
    initial?: undefined;
} | {
    name: string;
    type: string;
    caption: string;
    values: string[];
    initial: string;
    checked?: undefined;
})[];

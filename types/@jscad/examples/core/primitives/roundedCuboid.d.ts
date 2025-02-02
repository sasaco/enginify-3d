/**
 * Create a rounded cuboid with the supplied parameters
 * @param {Number} params.width - The cuboid's width.
 * @param {Number} params.depth - The cuboid's depth.
 * @param {Number} params.height - The cuboid's height.
 * @param {Number} params.rounded - 1 if the cuboid should be rounded, 0 otherwise.
 * @param {Number} params.radius - The cuboid's corner radius.
 * @returns {geometry}
 */
export function main(params: any): geometry;
export function getParameterDefinitions(): ({
    name: string;
    type: string;
    default: number;
    caption: string;
    values?: undefined;
    captions?: undefined;
} | {
    name: string;
    type: string;
    caption: string;
    values: number[];
    captions: string[];
    default: number;
})[];

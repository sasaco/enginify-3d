/**
 * Measure the area and volume of different geometries at different resolutions.
 * @param {String} params.shape - The shape to create. ( circle | square | star | sphere | cube )
 * @param {Number} params.size - The size of shape to create.
 * @param {Number} params.segments - The resolution of the shape to create. Affects only circle and sphere.
 * @returns {[geometry]} The created shape, and text describing its area and volume.
 */
export function main(params: any): [geometry];
export function getParameterDefinitions(): ({
    name: string;
    type: string;
    caption: string;
    values: string[];
    initial: string;
    min?: undefined;
    max?: undefined;
    step?: undefined;
} | {
    name: string;
    type: string;
    initial: number;
    min: number;
    max: number;
    step: number;
    caption: string;
    values?: undefined;
} | {
    name: string;
    type: string;
    values: number[];
    initial: number;
    caption: string;
    min?: undefined;
    max?: undefined;
    step?: undefined;
})[];

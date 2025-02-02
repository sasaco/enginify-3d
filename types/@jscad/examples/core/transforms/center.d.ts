/**
 * Creates a 3D crosshair, and centers it on various axes according to the parameters
 * @param {Boolean} params.centerx - Center the geometry on the X axis.
 * @param {Boolean} params.centery - Center the geometry on the Y axis.
 * @param {Boolean} params.centerz - Center the geometry on the Z axis.
 * @returns {geometry}
 */
export function main(params: any): geometry;
export function getParameterDefinitions(): {
    name: string;
    type: string;
    checked: boolean;
    caption: string;
}[];

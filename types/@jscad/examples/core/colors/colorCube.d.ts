/**
 * Creates a 9x9x9 cube showing color variations on the the 3 main spectra (rgb, hsv, hsl)
 * @param {String} params.method - The spectrum function to use: 'rgb'|'hsv'|'hsl'
 * @returns {[geometry]}
 */
export function main(params: any): [geometry];
export function getParameterDefinitions(): {
    name: string;
    type: string;
    caption: string;
    values: string[];
    captions: string[];
    initial: string;
}[];

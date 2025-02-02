/**
 * Serialize the give objects to SVG code (XML).
 * @see https://www.w3.org/TR/SVG/Overview.html
 * @param {Object} options - options for serialization, REQUIRED
 * @param {String} [options.unit='mm'] - unit of design; em, ex, px, in, cm, mm, pt, pc
 * @param {Function} [options.statusCallback] - call back function for progress ({ progress: 0-100 })
 * @param {Object|Array} objects - objects to serialize as SVG
 * @returns {Array} serialized contents, SVG code (XML string)
 * @alias module:io/svg-serializer.serialize
 * @example
 * const geometry = primitives.square()
 * const svgData = serializer({unit: 'mm'}, geometry)
 */
export function serialize(options: {
    unit?: string;
    statusCallback?: Function;
}, ...objects: any | any[]): any[];
export const mimeType: "image/svg+xml";

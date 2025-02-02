/**
 * Serialize the give objects to 3MF contents (XML) or 3MF packaging (OPC).
 * @see https://3mf.io/specification/
 * @param {Object} [options] - options for serialization
 * @param {String} [options.unit='millimeter'] - unit of design; millimeter, inch, feet, meter or micrometer
 * @param {Boolean} [options.metadata=true] - add metadata to 3MF contents, such at CreationDate
 * @param {Array} [options.defaultcolor=[0,0,0,1]] - default color for objects
 * @param {Boolean} [options.compress=true] - package and compress the contents
 * @param {Object|Array} objects - objects to serialize into 3D manufacturing format
 * @returns {Array} serialized contents, 3MF contents (XML) or 3MF packaging (ZIP)
 * @example
 * const geometry = primitives.cube()
 * const package = serializer({unit: 'meter'}, geometry) // 3MF package, ZIP format
 */
export function serialize(options?: {
    unit?: string;
    metadata?: boolean;
    defaultcolor?: any[];
    compress?: boolean;
}, ...objects: any | any[]): any[];
export const mimeType: "model/3mf";
export const fileExtension: "3mf";

/**
 * Serialize the give objects to X3D elements (XML).
 * @param {Object} options - options for serialization, REQUIRED
 * @param {Array} [options.color=[0,0,1,1]] - default color for objects
 * @param {Number} [options.shininess=8/256] - x3d shininess for specular highlights
 * @param {Boolean} [options.smooth=false] - use averaged vertex normals
 * @param {Number} [options.decimals=1000] - multiplier before rounding to limit precision
 * @param {Boolean} [options.metadata=true] - add metadata to 3MF contents, such at CreationDate
 * @param {String} [options.unit='millimeter'] - unit of design; millimeter, inch, feet, meter or micrometer
 * @param {Function} [options.statusCallback] - call back function for progress ({ progress: 0-100 })
 * @param {Object|Array} objects - objects to serialize as X3D
 * @returns {Array} serialized contents, X3D format (XML)
 * @alias module:io/x3d-serializer.serialize
 * @example
 * const geometry = primitives.cube()
 * const x3dData = serializer({unit: 'meter'}, geometry)
 */
export function serialize(options: {
    color?: any[];
    shininess?: number;
    smooth?: boolean;
    decimals?: number;
    metadata?: boolean;
    unit?: string;
    statusCallback?: Function;
}, ...objects: any | any[]): any[];
export const mimeType: "model/x3d+xml";

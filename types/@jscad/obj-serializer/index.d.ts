/**
 * Serialize the give objects (geometry) to OBJ source data.
 * @param {Object} options - options for serialization
 * @param {Boolean} [options.triangulate=true] - triangle or polygon faces
 * @param {Function} [options.statusCallback] - call back function for progress ({ progress: 0-100 })
 * @param {...Object} objects - objects to serialize into OBJ source data
 * @returns {Array} serialized contents, OBJ source data
 * @alias module:io/obj-serializer.serialize
 * @example
 * const geometry = primitives.cube()
 * const objData = serializer({}, geometry)
 */
export function serialize(options: {
    triangulate?: boolean;
    statusCallback?: Function;
}, ...objects: any[]): any[];
export const mimeType: "application/object";

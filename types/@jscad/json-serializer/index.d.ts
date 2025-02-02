/**
 * Serialize the give objects to JSON.
 * @param {Object} options - options for serialization, REQUIRED
 * @param {Object|Array} objects - objects to serialize as JSON
 * @returns {Array} serialized contents as JSON string
 * @alias module:io/json-serializer.serialize
 * @example
 * const geometry = primitives.cube()
 * const jsonData = serializer({}, geometry)
 */
export function serialize(options: any, ...objects: any | any[]): any[];
export const mimeType: "application/json";

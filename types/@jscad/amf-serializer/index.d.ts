/**
 * Serialize the give objects (geometry) to AMF source data (XML).
 * @param {Object} options - options for serialization
 * @param {String} [options.unit='millimeter'] - unit of design; millimeter, inch, feet, meter or micrometer
 * @param {Function} [options.statusCallback] - call back function for progress ({ progress: 0-100 })
 * @param {...Object} objects - objects to serialize into AMF source data
 * @returns {Array} serialized contents, AMF source data(XML)
 * @alias module:io/amf-serializer.serialize
 * @example
 * const geometry = primitives.cube()
 * const amfData = serializer({unit: 'meter'}, geometry)
 */
export function serialize(options: {
    unit?: string;
    statusCallback?: Function;
}, ...objects: any[]): any[];
export const mimeType: "application/amf+xml";

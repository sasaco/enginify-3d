/**
 * Deserialize the given JSON notation (string) into either a script or an array of geometry.
 * @param {Object} options - options used during deserializing, REQUIRED
 * @param {String} [options.filename='json'] - filename of original JSON source
 * @param {String} [options.output='script'] - either 'script' or 'geometry' to set desired output
 * @param {String} [options.version='0.0.0'] - version number to add to the metadata
 * @param {Boolean} [options.addMetadata=true] - toggle injection of metadata at the start of the script
 * @param {String} input - JSON source data
 * @return {[geometry]/String} either an array of objects (geometry) or a string (script)
 * @alias module:io/json-deserializer.deserialize
 */
export function deserialize(options: {
    filename?: string;
    output?: string;
    version?: string;
    addMetadata?: boolean;
}, input: string): [geometry];
export const extension: "json";

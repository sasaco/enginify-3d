/**
 * Deserializer of OBJ data to JSCAD geometries.
 * @module io/obj-deserializer
 * @example
 * const { deserializer, extension } = require('@jscad/obj-deserializer')
 */
/**
 * Parse the given OBJ data and return either a JSCAD script or a set of geometry
 * @see http://en.wikipedia.org/wiki/Wavefront_.obj_file
 * @param {Object} options - options used during deserializing, REQUIRED
 * @param {string} [options.filename='obj'] - filename of the original obj data
 * @param {string} [options.version='0.0.0'] - version number to add to the metadata
 * @param {boolean} [options.addMetadata=true] - toggle injection of metadata at the start of the script
 * @param {string} [options.output='script'] - either 'script' or 'geometry' to set desired output
 * @param  {string} input - obj data
 * @return {[object]/string} either a script (script) or a set of objects (geometry)
 * @alias module:io/obj-deserializer.deserialize
 */
export function deserialize(options: {
    filename?: string;
    version?: string;
    addMetadata?: boolean;
    output?: string;
}, input: string): [object];
export const extension: "obj";

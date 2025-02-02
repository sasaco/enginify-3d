/**
 * Deserializer of STL data to JSCAD geometries.
 * @module io/stl-deserializer
 * @example
 * const { deserializer, extension } = require('@jscad/stl-deserializer')
 */
/**
 * Parse the given STL data and return either a JSCAD script or a list of geometries
 * @param {Object} options - options used during deserializing, REQUIRED
 * @param {string} [options.filename='stl'] - filename of original STL source
 * @param {string} [options.version='0.0.0'] - version number to add to the metadata
 * @param {boolean} [options.addMetadata=true] - toggle injection of metadata at the start of the script
 * @param {string} [options.output='script'] - either 'script' or 'geometry' to set desired output
 * @param {string} input - stl data
 * @return {[objects]|string} a list of objects (geometry) or a string (script)
 * @alias module:io/stl-deserializer.deserialize
 */
export function deserialize(options: {
    filename?: string;
    version?: string;
    addMetadata?: boolean;
    output?: string;
}, stl: any): [objects] | string;
export const extension: "stl";

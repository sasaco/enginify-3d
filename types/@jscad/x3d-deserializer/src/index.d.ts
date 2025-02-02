/**
 * Deserialize the given X3D source (XML Encoding) into either a script or an array of geometry
 * @see {@link https://www.web3d.org/documents/specifications/19776-1/V3.3/index.html|X3D File Format}
 * @see README for supported conversions.
 * @param {Object} [options] - options used during deserializing
 * @param {String} [options.filename='x3d'] - filename of original X3D source
 * @param {String} [options.output='script'] - either 'script' or 'geometry' to set desired output
 * @param {String} [options.version] - version added to the script metadata, default is package version
 * @param {Boolean} [options.addMetadata=true] - toggle injection of metadata at the start of the script
 * @param {String} input - X3D source data (XML)
 * @returns {(Array|String)} either an array of objects (geometry) or a string (script)
 * @alias module:io/x3d-deserializer.deserialize
 */
export function deserialize(options?: {
    filename?: string;
    output?: string;
    version?: string;
    addMetadata?: boolean;
}, input: string): (any[] | string);
export const extension: "x3d";

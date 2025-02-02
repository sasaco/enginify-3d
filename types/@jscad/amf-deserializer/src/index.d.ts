/**
 * Deserialize the given AMF source (XML) into either a script or an array of geometry
 * @see {@link https://en.wikipedia.org/wiki/Additive_manufacturing_file_format|AMF File Format}
 * @see README for supported conversions
 * @param {Object} options - options used during deserializing
 * @param {String} [options.filename='amf'] - filename of original AMF source
 * @param {String} [options.output='script'] - either 'script' or 'geometry' to set desired output
 * @param {String} [options.version] - version added to the script metadata, default is package version
 * @param {Boolean} [options.addMetadata=true] - toggle injection of metadata at the start of the script
 * @param {String} input - AMF source data (XML)
 * @returns {(Array|String)} either an array of objects (geometry) or a string (script)
 * @alias module:io/amf-deserializer.deserialize
 */
export function deserialize(options: {
    filename?: string;
    output?: string;
    version?: string;
    addMetadata?: boolean;
}, input: string): (any[] | string);
export const extension: "amf";

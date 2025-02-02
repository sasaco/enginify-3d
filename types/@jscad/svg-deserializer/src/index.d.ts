/**
 * Deserializer of SVG source data to JSCAD geometries.
 * @see {@link https://github.com/jscad/OpenJSCAD.org/blob/master/packages/io/svg-deserializer/README.md|README} for supported conversion of SVG elements.
 * @module io/svg-deserializer
 * @example
 * const { deserializer, extension } = require('@jscad/svg-deserializer')
 */
/**
 * Deserialize the given SVG source into either a script or an array of geometries
 * @see {@link https://www.w3.org/TR/SVG/intro.html|SVG Specification}
 * @param {Object} options - options used during deserializing, REQUIRED
 * @param {boolean} [options.addMetadata=true] - toggle injection of metadata at the start of the script
 * @param {string} [options.filename='svg'] - filename of original SVG source
 * @param {string} [options.output='script'] - either 'script' or 'geometry' to set desired output
 * @param {float} [options.pxPmm] - custom pixels per mm unit
 * @param {integer} [options.segments] - number of segments for rounded shapes
 * @param {string} [options.target] - target 2D geometry; 'geom2' or 'path2'
 * @param {string} [options.version='0.0.0'] - version number to add to the metadata
 * @param {string} [options.pathSelfClosed='error'] - [error||trim||split] if path self-closes with one of commands without stop command right after
 * @param {string} input - SVG source data
 * @returns {(Array|String)} either an array of objects (geometry) or a string (script)
 * @alias module:io/svg-deserializer.deserialize
 */
export function deserialize(options: {
    addMetadata?: boolean;
    filename?: string;
    output?: string;
    pxPmm?: float;
    segments?: integer;
    target?: string;
    version?: string;
    pathSelfClosed?: string;
}, input: string): (any[] | string);
export const extension: "svg";

export = vectorChar;
/**
 * Represents a character as a list of segments
 * @typedef {Object} VectorCharObject
 * @property {Float} width - character width
 * @property {Float} height - character height (uppercase)
 * @property {Array} segments - character segments [[[x, y], ...], ...]
 */
/** Construct a {@link VectorCharObject} from a ascii character whose code is between 31 and 127,
* if the character is not supported it is replaced by a question mark.
* @param {Object|String} [options] - options for construction or ascii character
* @param {Float} [options.xOffset=0] - x offset
* @param {Float} [options.yOffset=0] - y offset
* @param {Float} [options.height=21] - font size (uppercase height)
* @param {Float} [options.extrudeOffset=0] - width of the extrusion that will be applied (manually) after the creation of the character
* @param {String} [options.input='?'] - ascii character (ignored/overwrited if provided as seconds parameter)
* @param {String} [char='?'] - ascii character
* @returns {VectorCharObject}
* @alias module:modeling/text.vectorChar
*
* @example
* let vectorCharObject = vectorChar()
* let vectorCharObject = vectorChar('A')
* let vectorCharObject = vectorChar({ xOffset: 57 }, 'C')
* let vectorCharObject = vectorChar({ xOffset: 78, input: '!' })
*/
declare function vectorChar(options?: any | string, char?: string): VectorCharObject;
declare namespace vectorChar {
    export { VectorCharObject };
}
/**
 * Represents a character as a list of segments
 */
type VectorCharObject = {
    /**
     * - character width
     */
    width: Float;
    /**
     * - character height (uppercase)
     */
    height: Float;
    /**
     * - character segments [[[x, y], ...], ...]
     */
    segments: any[];
};

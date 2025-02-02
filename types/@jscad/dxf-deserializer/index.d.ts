/**
 * Deserialize the given DXF source into either a script or an array of geometry
 * @param {Object} options - options used during deserializing, REQUIRED
 * @param {string} [options.filename='dxf'] - filename of original DXF data stream
 * @param {String} [options.version] - version added to the script metadata, default is package version
 * @param {string} [options.output='script'] - either 'script' or 'geometry' to set desired output
 * @param {boolean} [options.strict=true] - obey strict DXF specifications
 * @param {array} [options.colorindex=[]] - list of colors (256) for use during rendering
 * @param {string} src - DXF data stream
 * @return {string|[objects]} a string (script) or array of objects (geometry)
 * @alias module:io/dxf-deserializer.deserialize
 */
export function deserialize(options: {
    filename?: string;
    version?: string;
    output?: string;
    strict?: boolean;
    colorindex?: any[];
}, src: string): string | [objects];
export const extension: "dxf";

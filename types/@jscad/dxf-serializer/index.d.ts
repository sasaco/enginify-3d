/**
 * Serializer of JSCAD geometries to DXF entities.
 * @module io/dxf-serializer
 * @example
 * const { serializer, mimeType } = require('@jscad/dxf-serializer')
 */
/**
 * Serialize the give objects to AutoCad DXF format.
 * @param {Object} options - options for serialization, REQUIRED
 * @param {String} [options.geom2To='lypolyline'] - target entity for 2D geometries, 'lwpolyline' or 'polyline'
 * @param {String} [options.geom3To='3dface'] - target entity for 3D geometries, '3dface' or 'polyline'
 * @param {Object|Array} objects - objects to serialize as DXF
 * @returns {Array} serialized contents, DXF format
 * @alias module:io/dxf-serializer.serialize
 * @example
 * const geometry = primitives.cube()
 * const dxfData = serializer({geom3To: '3dface'}, geometry)
 */
export function serialize(options: {
    geom2To?: string;
    geom3To?: string;
}, ...objects: any | any[]): any[];
export const mimeType: "application/dxf";

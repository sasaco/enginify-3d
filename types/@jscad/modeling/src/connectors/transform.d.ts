export = transform;
/**
 * Transform the give connector using the given matrix.
 * @param {mat4} matrix - a transform matrix
 * @param {connector} connector - the connector to transform
 * @returns {connector} a new connector
 * @alias module:modeling/connectors.transform
 */
declare function transform(matrix: typeof mat4, connector: any): any;

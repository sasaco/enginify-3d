export = makeBlob;
/**
 * Make a constructor for Blob objects.
 * @return {Function} constructor of Blob objects
 * @alias module:io/utils.makeBlob
 * @example
 * const Blob = makeBlob()
 * const ablob = new Blob(data, { type: mimeType })
 */
declare function makeBlob(): Function;

export = requireDesignFromModule;
/** load a jscad script, injecting the basic dependencies if necessary
 * @param  {string} filePath
 * @param  {function} requireFn : the 'require' function to use: defaults to the standard 'require' under node.js
 */
declare function requireDesignFromModule(filePath: string, requireFn?: Function): any;

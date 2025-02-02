/** get main entry point of a design, given a file system instance and a list of paths
 * @param  {Object} fs a file-system like object (either node's fs or some other) providing at least
 * statSync, existSync, readFileSync, readdirSync
 * @param  {} paths
 */
export function getDesignEntryPoint(fs: any, paths: any): any;
/** extract the design name from
 * @param  {Object} fs a file-system like object (either node's fs or some other) providing at least statSync, existSync, readFileSync
 * @param  {Array} paths an array of paths (strings) or a single path
 */
export function getDesignName(fs: any, paths: any[]): any;

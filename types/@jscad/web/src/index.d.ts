export = makeJscad;
/** make creator function, to create new jscad instances
 * @param  {DOM element} targetElement the dom element where you want to create your jscad instance
 * @param {Object} options
 * @param {String} options.name the UNIQUE name of the output instance, if you re-use the same name
 * you might run into weird issues
 * @param {Boolean} options.logging toggle logging on/off
 */
declare function makeJscad(targetElement: any, options: {
    name: string;
    logging: boolean;
}): Promise<(params: any) => void>;

export class Node {
    constructor(i: any, x: any, y: any);
    i: any;
    x: any;
    y: any;
    prev: any;
    next: any;
    z: any;
    prevZ: any;
    nextZ: any;
    steiner: boolean;
}
export function insertNode(i: any, x: any, y: any, last: any): Node;
export function removeNode(p: any): void;
import sortLinked = require("@jscad/modeling/src/operations/extrusions/earcut/linkedListSort");
export { sortLinked };

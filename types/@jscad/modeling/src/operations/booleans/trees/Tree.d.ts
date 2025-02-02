export = Tree;
declare class Tree {
    constructor(polygons: any);
    polygonTree: PolygonTreeNode;
    rootnode: Node;
    invert(): void;
    clipTo(tree: any, alsoRemovecoplanarFront?: boolean): void;
    allPolygons(): any[];
    addPolygons(polygons: any): void;
    clear(): void;
    toString(): string;
}
import PolygonTreeNode = require("@jscad/modeling/src/operations/booleans/trees/PolygonTreeNode");
import Node = require("@jscad/modeling/src/operations/booleans/trees/Node");

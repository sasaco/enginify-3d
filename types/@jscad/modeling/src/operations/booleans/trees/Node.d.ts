export = Node;
declare class Node {
    constructor(parent: any);
    plane: any;
    front: any;
    back: any;
    polygontreenodes: any[];
    parent: any;
    invert(): void;
    clipPolygons(polygontreenodes: any, alsoRemovecoplanarFront: any): void;
    clipTo(tree: any, alsoRemovecoplanarFront: any): void;
    addPolygonTreeNodes(newpolygontreenodes: any): void;
}

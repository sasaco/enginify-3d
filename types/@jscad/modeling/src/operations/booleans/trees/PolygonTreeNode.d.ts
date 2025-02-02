export = PolygonTreeNode;
declare class PolygonTreeNode {
    constructor(parent: any, polygon: any);
    parent: any;
    children: any[];
    polygon: any;
    removed: boolean;
    addPolygons(polygons: any): void;
    remove(): void;
    isRemoved(): boolean;
    isRootNode(): boolean;
    invert(): void;
    getPolygon(): any;
    getPolygons(result: any): void;
    splitByPlane(plane: any, coplanarfrontnodes: any, coplanarbacknodes: any, frontnodes: any, backnodes: any): void;
    _splitByPlane(splane: any, coplanarfrontnodes: any, coplanarbacknodes: any, frontnodes: any, backnodes: any): void;
    addChild(polygon: any): PolygonTreeNode;
    invertSub(): void;
    recursivelyInvalidatePolygon(): void;
    clear(): void;
    toString(): string;
}

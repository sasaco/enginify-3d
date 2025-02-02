export namespace x3dTypes {
    let X3D: number;
    let UNIT: number;
    let META: number;
    let SCENE: number;
    let TRANSFORM: number;
    let SHAPE: number;
    let GROUP: number;
    let APPEARANCE: number;
    let TRIANGLESET: number;
    let TRIANGLEFANSET: number;
    let TRIANGLESTRIPSET: number;
    let QUADSET: number;
    let INDEXEDTRIANGLESET: number;
    let INDEXEDTRIANGLEFANSET: number;
    let INDEXEDTRIANGLESTRIPSET: number;
    let INDEXEDQUADSET: number;
    let ELEVATIONGRID: number;
    let INDEXEDFACESET: number;
    let LINESET: number;
    let INDEXEDLINESET: number;
    let BOX: number;
    let CONE: number;
    let CYLINDER: number;
    let SPHERE: number;
    let EXTRUSION: number;
    let ARC2D: number;
    let ARCCLOSE2D: number;
    let CIRCLE2D: number;
    let DISK2D: number;
    let POLYLINE2D: number;
    let RECTANGLE2D: number;
    let TRIANGLESET2D: number;
    let COLOR: number;
    let COORDINATE: number;
    let MATERIAL: number;
}
export function x3dX3D(element: any): {
    definition: number;
};
export function x3dUnit(element: any): {
    definition: number;
    category: string;
    name: string;
    conversionFactor: number;
};
export function x3dMeta(element: any): {
    definition: number;
    content: string;
    name: string;
};
export function x3dScene(element: any): {
    definition: number;
};
export function x3dTransform(element: any): {
    definition: number;
    center: number[];
    rotation: number[];
    scale: number[];
    scaleOrientation: number[];
    translation: number[];
};
export function x3dShape(element: any): {
    definition: number;
};
export function x3dGroup(element: any): {
    definition: number;
};
export function x3dBox(element: any): {
    definition: number;
    size: number[];
};
export function x3dCone(element: any): {
    definition: number;
    bottomRadius: number;
    height: number;
    subdivision: number;
    topRadius: number;
};
export function x3dCylinder(element: any): {
    definition: number;
    height: number;
    radius: number;
    subdivision: number;
};
export function x3dSphere(element: any): {
    definition: number;
    radius: number;
    subdivision: number;
};
export function x3dExtrusion(element: any): {
    definition: number;
    ccw: boolean;
    beginCap: boolean;
    endCap: boolean;
    crossSection: number[][];
    orientations: number[][];
    scales: number[][];
    spine: number[][];
};
export function x3dArc2D(element: any): {
    definition: number;
    endAngle: number;
    radius: number;
    startAngle: number;
    subdivision: number;
};
export function x3dArcClose2D(element: any): {
    definition: number;
    closureType: string;
    endAngle: number;
    radius: number;
    startAngle: number;
    subdivision: number;
};
export function x3dCircle2D(element: any): {
    definition: number;
    radius: number;
    subdivision: number;
};
export function x3dDisk2D(element: any): {
    definition: number;
    innerRadius: number;
    outerRadius: number;
    subdivision: number;
};
export function x3dPolyline2D(element: any): {
    definition: number;
    lineSegments: any[];
};
export function x3dRectangle2D(element: any): {
    definition: number;
    size: number[];
};
export function x3dTriangleSet2D(element: any): {
    definition: number;
    vertices: any[];
};
export function x3dColor(element: any): {
    definition: number;
    colors: any[];
};
export function x3dCoordinate(element: any): {
    definition: number;
    points: any[];
};
export function x3dTriangleSet(element: any): {
    definition: number;
    ccw: boolean;
    colorPerVertex: boolean;
};
export function x3dTriangleFanSet(element: any): {
    definition: number;
    ccw: boolean;
    fanCount: any[];
    colorPerVertex: boolean;
};
export function x3dTriangleStripSet(element: any): {
    definition: number;
    ccw: boolean;
    stripCount: any[];
    colorPerVertex: boolean;
};
export function x3dQuadSet(element: any): {
    definition: number;
    ccw: boolean;
    colorPerVertex: boolean;
};
export function x3dIndexedTriangleSet(element: any): {
    definition: number;
    ccw: boolean;
    index: any[];
    colorPerVertex: boolean;
};
export function x3dIndexedTriangleFanSet(element: any): {
    definition: number;
    ccw: boolean;
    fans: any[];
    colorPerVertex: boolean;
};
export function x3dIndexedTriangleStripSet(element: any): {
    definition: number;
    ccw: boolean;
    strips: any[];
    colorPerVertex: boolean;
};
export function x3dIndexedQuadSet(element: any): {
    definition: number;
    ccw: boolean;
    index: any[];
    colorPerVertex: boolean;
};
export function x3dIndexedFaceSet(element: any): {
    definition: number;
    ccw: boolean;
    convex: boolean;
    faces: any[];
    colorPerVertex: boolean;
    colorIndex: any;
};
export function x3dElevationGrid(element: any): {
    definition: number;
    xDimension: number;
    zDimension: number;
    xSpacing: number;
    zSpacing: number;
    height: number[];
    ccw: boolean;
    solid: boolean;
    colorPerVertex: boolean;
};
export function x3dLineSet(element: any): {
    definition: number;
    vertexCount: any[];
    colorPerVertex: boolean;
};
export function x3dIndexedLineSet(element: any): {
    definition: number;
    indexes: any[];
    colorPerVertex: boolean;
};
export function x3dAppearance(element: any): {
    definition: number;
};
export function x3dMaterial(element: any): {
    definition: number;
    color: number[];
};

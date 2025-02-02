export let comparePoints: (list1: any[], list2: any[]) => boolean;
export let comparePolygonLists: (polygons1: any, polygons2: any) => any;
export let comparePolygons: (poly1: any, poly2: any) => boolean;
export let comparePolygonsAsPoints: (list1: any, list2: any) => boolean;
export let compareVectors: (vec1: vec, vec2: vec, eps?: number) => boolean;
export let nearlyEqual: (t: any, a: any, b: any, epsilon: any, failMessage: any) => boolean;

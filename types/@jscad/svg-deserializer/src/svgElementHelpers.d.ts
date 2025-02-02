export function svgCore(obj: any, element: any): void;
export function svgPresentation(obj: any, element: any): void;
export function svgSvg(element: any, { customPxPmm }: {
    customPxPmm: any;
}): {
    type: string;
    x: number;
    y: number;
    width: string;
    height: string;
    strokeWidth: string;
};
export function svgRect(element: any): {
    type: string;
    x: string;
    y: string;
    rx: string;
    ry: string;
    width: string;
    height: string;
};
export function svgCircle(element: any): {
    type: string;
    x: string;
    y: string;
    radius: string;
};
export function svgEllipse(element: any): {
    type: string;
    cx: string;
    cy: string;
    rx: string;
    ry: string;
};
export function svgLine(element: any): {
    type: string;
    x1: string;
    y1: string;
    x2: string;
    y2: string;
};
export function svgPolyline(element: any): {
    type: string;
};
export function svgPolygon(element: any): {
    type: string;
};
export function svgGroup(element: any): {
    type: string;
};
export function svgPath(element: any): {
    type: string;
};
export function svgUse(element: any, { svgObjects }: {
    svgObjects: any;
}): {
    type: string;
};

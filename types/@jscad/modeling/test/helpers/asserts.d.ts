export function assertSameGeometry(t: any, observed: any, expected: any, failMessage: any): void;
export function comparePolygons(a: any, b: any): boolean;
export function simplifiedPolygon(polygon: any): {
    positions: any;
    plane: {
        normal: any[];
        w: any;
    };
    shared: any;
};
export function simplifieSides(cag: any): any;
export function CAGNearlyEquals(observed: any, expected: any, precision: any): boolean;

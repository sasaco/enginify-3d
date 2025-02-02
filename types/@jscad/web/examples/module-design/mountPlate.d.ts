export function create(length: any): geom3.Geom3;
export function getParameterDefinitions(): ({
    name: string;
    type: string;
    initial: string;
    caption: string;
    min?: undefined;
    max?: undefined;
} | {
    name: string;
    type: string;
    initial: number;
    caption: string;
    min: number;
    max: number;
})[];

export function main(params: any): jscad.geometries.geom3.Geom3;
export function getParameterDefinitions(): ({
    name: string;
    caption: string;
    type: string;
    initial: number;
    min: number;
    max: number;
    step: number;
} | {
    name: string;
    caption: string;
    type: string;
    initial: number;
    min?: undefined;
    max?: undefined;
    step?: undefined;
} | {
    name: string;
    caption: string;
    type: string;
    initial: number;
    step: number;
    min?: undefined;
    max?: undefined;
})[];
import jscad = require("@jscad/modeling");

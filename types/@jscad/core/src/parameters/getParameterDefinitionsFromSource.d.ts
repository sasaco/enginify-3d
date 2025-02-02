export function getParameterDefinitionsFromSource(script: any): any[];
export function parseOne(comment: any, code: any, line1: any, line2: any): {
    name: any;
    type: string;
};
export function parseComment(comment: any, lineNum: any, paramName: any): {
    options: any;
    caption: any;
};
export function parseDef(code: any, line: any): {
    name: any;
    type: string;
};
export function combineParameterDefinitions(paramDefFromSource: any, extraDef: any): any[];

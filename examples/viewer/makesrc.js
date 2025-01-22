const wifcapi = "../../src/ts/web-ifc-api.ts";
const ifc_schema = "../../src/ts/ifc-schema.ts";

const fs = require("fs");

let wifcapi_data = '';
let ifc_schema_data = '';

try {
    wifcapi_data = fs.readFileSync(wifcapi).toString();
    ifc_schema_data = fs.readFileSync(ifc_schema).toString();
} catch (error) {
    // Fallback to compiled .d.ts files if source files not found
    try {
        wifcapi_data = fs.readFileSync("../../dist/web-ifc-api.d.ts").toString();
        ifc_schema_data = fs.readFileSync("../../dist/ifc-schema.d.ts").toString();
    } catch (innerError) {
        console.error("Could not find TypeScript source or declaration files");
        process.exit(1);
    }
}

let escape = (s) => {
    return JSON.stringify(s.replace(/export/g, "")).slice(1, -1);
}

let tsContent = `
    export let wifcapi = "${escape(wifcapi_data)}";
    export let ifc_schema = "${escape(ifc_schema_data)}";
`;

fs.writeFileSync("ts_src.js", tsContent);

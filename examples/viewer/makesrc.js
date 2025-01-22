const wifcapi = "../../src/ts/web-ifc-api.ts";
const ifc_schema = "../../src/ts/ifc-schema.ts";

const fs = require("fs");

let wifcapi_data = '';
let ifc_schema_data = '';

try {
    wifcapi_data = fs.readFileSync(wifcapi).toString();
    ifc_schema_data = fs.readFileSync(ifc_schema).toString();
} catch (error) {
    console.error("Could not find TypeScript source files:", error);
    process.exit(1);
}

let escape = (s) => {
    return JSON.stringify(s.replace(/export/g, "")).slice(1, -1);
}

let tsContent = `
    window.ts_decl = {
        wifcapi: "${escape(wifcapi_data)}",
        ifc_schema: "${escape(ifc_schema_data)}"
    };
`;

fs.writeFileSync("ts_src.js", tsContent);

const wifcapi = "../../dist/web-ifc-api.d.ts";
const ifc_schema = "../../dist/ifc-schema.d.ts";

const fs = require("fs");

let wifcapi_data = '';
let ifc_schema_data = '';

try {
    wifcapi_data = fs.readFileSync(wifcapi).toString();
    ifc_schema_data = fs.readFileSync(ifc_schema).toString();
} catch (error) {
    console.error("Could not find TypeScript declaration files:", error);
    process.exit(1);
}

let escape = (s) => {
    return JSON.stringify(s.replace(/export/g, "")).slice(1, -1);
}

let tsContent = `
    export let wifcapi = "${escape(wifcapi_data)}";
    export let ifc_schema = "${escape(ifc_schema_data)}";
`;

fs.writeFileSync("ts_src.js", tsContent);
